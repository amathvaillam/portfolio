import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = '/api/persons'

let token = null

const setToken = newToken => {
    token = `bearer ${ newToken }`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios
        .get( baseUrl,config )
    return request.then( response => response.data )
}

const create = newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post( baseUrl,newObject,config )
    return request.then( response => response.data )
}

const update = ( id,newObject ) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put( `${ baseUrl }/${ id }`,newObject,config )
    return request.then( response => response.data )
}


const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete( `${ baseUrl }/${ id }`,config )
    return request.then( response => response.data )
}

const exported = { getAll,create,remove,update,setToken }
export default exported 
