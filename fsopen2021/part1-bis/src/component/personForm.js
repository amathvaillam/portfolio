import React,{ useState } from 'react'

const PersonForm = ( { handleAdd } ) => {

    const [ newName,setNewName ] = useState( '' )
    const [ phoneNumber,setPhoneNumber ] = useState( '' )
    const addName = ( event ) => {
        event.preventDefault()
        handleAdd( { newName,phoneNumber } )
        setNewName( '' )
        setPhoneNumber( '' )
    }

    const handleNameChange = ( event ) => {
        setNewName( event.target.value )
    }

    const handleNumberChange = ( event ) => {
        setPhoneNumber( event.target.value )
    }

    return (
        <>
            <form onSubmit={ addName }>
                <div>
                    name: <input
                        value={ newName }
                        onChange={ handleNameChange }
                    />
                </div>
                <div>
                    number: <input
                        value={ phoneNumber }
                        onChange={ handleNumberChange }
                    />
                </div>
                <div>
                    <button type="submit"> add</button>
                </div>
            </form>
        </>
    )
}
export default PersonForm