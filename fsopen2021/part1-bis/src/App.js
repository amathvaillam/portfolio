import React,{ useState,useEffect,useRef } from 'react'
//services
import personService from './services/person.services'
import loginService from './services/login.services'

//components
import Togglable from './component/Togglable'
import LoginForm from './component/loginForm'
import PersonForm from './component/personForm'
import Person from './component/person'
import { SuccessNotification,ErrorNotification } from './component/notifications'
import './index.css'


const Filter = ( { filtered,handleChangeFilter } ) => {
  return ( <><input value={ filtered } onChange={ handleChangeFilter } /></> )
}
const Show = ( { persons,handleDelete,filtered,handleAddLike } ) => {
  const data = filtered === '' ?
    persons :
    persons.filter( person => person.name.includes( filtered ) )

  return ( <>
    { data.map( ( person,id ) => (
      <Person key={ id }
        person={ person }
        handleDelete={ handleDelete }
        handleAddLike={ handleAddLike } /> )
    ) } </> )
}

const App = () => {
  const [ persons,setPersons ] = useState( [] )
  const [ filtered,setFiltered ] = useState( '' )

  const [ message,setMessage ] = useState( '' )
  const [ typeMessage,setTypeMessage ] = useState( '' )
  const [ user,setUser ] = useState( null )

  //ref
  const personFormRef = useRef()

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem( 'loggedUser' )
    if ( loggedUserJSON )
    {
      const user = JSON.parse( loggedUserJSON )
      setUser( user )
      personService.setToken( user.token )
    }
  },[] )

  useEffect( () => {
    if ( user )
      personService
        .getAll()
        .then( response => setPersons( response ) )
        .catch( error => setUser( null ) )
  },[ user ] )

  const handleSetPersons = ( newName ) => {
    setPersons( persons.concat( newName ) )
  }
  const handleChangeFilter = ( event ) => {
    setFiltered( event.target.value )
  }
  const showMessage = ( message,type ) => {
    if ( message && type )
    {
      setMessage( message )
      setTypeMessage( type )
    }
    setTimeout( () => {
      setMessage( '' )
      setTypeMessage( '' )
    },5000 )
  }
  const handleLogin = async ( { username,password } ) => {
    try
    {
      const user = await loginService.login( {
        username,password,
      } )
      window.localStorage.setItem(
        'loggedUser',JSON.stringify( user )
      )
      setUser( user )
      personService.setToken( user.token )
      showMessage( ` ${ username } successfully logged`,'success' )
    } catch ( exception )
    {
      showMessage( `Wrong credentials`,'success' )
    }
  }
  const handleAdd = async ( { newName,phoneNumber } ) => {
    personFormRef.current.toggleVisibility()
    const exist = persons.find( person => person.name === newName )

    exist !== undefined && exist.name === newName ?
      personService.update( exist.id,{ name: newName,number: phoneNumber } )
        .then( response => {
          showMessage( `Modified ${ response.name }`,'success' )
          setPersons( persons.map( person => person.name !== newName ? person : response ) )
        } ).catch( error => setUser( null ) )
      :
      personService.create( { name: newName,number: phoneNumber } )
        .then( response => {
          showMessage( `Added ${ response.name }`,'success' )
          handleSetPersons( response )
        } ).catch( error => setUser( null ) )
  }
  const handleDelete = ( { name,rid } ) => {
    personService.remove( rid )
      .then( response => {
        showMessage( `Deleted ${ name }`,'success' )
        setPersons( persons.filter( ( { id } ) => id !== rid ) )
      } ).catch( ( error ) => {
        showMessage( `Already deleted ${ name }`,'error' )
        setPersons( persons.filter( ( { id } ) => id !== rid ) )
      } )
  }
  const handleAddLike = ( id,person ) => {
    personService.update( id,person )

      .then( response => {
        showMessage(
          `Like added to ${ person.name }`,'success' )
        setPersons( persons.map( ( person ) => person.id === id ? response : person ) )
      } ).catch( ( error ) => {
        console.log( error )
        showMessage( `Error ${ person.name }`,'error' )
      } )
  }

  const personForm = () => (
    <>
      <Filter
        handleChangeFilter={ handleChangeFilter }
      />
      <Togglable buttonLabel='new Person' ref={ personFormRef }>
        <PersonForm
          handleAdd={ handleAdd }
        />
      </Togglable>
    </>
  )
  const loginForm = () => ( <LoginForm handleLogin={ handleLogin } /> )

  const logOut = () => (
    <>{ user.name } is logged in <button onClick={ () => setUser( null ) }>logout</button><br /></>
  )

  const show = () => (
    persons.length === 0 ?
      `no number recorded` :
      <Show persons={ persons } filtered={ filtered } handleDelete={ handleDelete } handleAddLike={ handleAddLike } />
  )

  const successNotification = () => ( <SuccessNotification message={ message } /> )
  const errorNotification = () => ( <ErrorNotification message={ message } /> )

  return (
    <div>
      <h2>Phonebook</h2>
      { ( message && typeMessage === 'error' ) && errorNotification() }
      { ( message && typeMessage === 'success' ) && successNotification() }
      { user === null ? loginForm() : logOut() }
      { user !== null && personForm() }
      <h2>Numbers</h2>
      { user !== null && show() }
    </div >
  )
}

export default App