import React,{ useState } from 'react'

const Person = ( { person,handleDelete,handleAddLike } ) => {

    const [ display,setDisplay ] = useState( false )
    const { id,name,number,likes } = person
    return (
        <div
            style={ {
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'black',
                paddingTop: 10,
                marginBottom: 10
            } }
            key={ id }>name: { name }<button onClick={ () => setDisplay( !display ) }>{ !display ? "show" : "hide" }</button><br />
            <p style={ { display: !display ? 'none' : '' } }> Number : { number }
                <br /><input type='button' value='delete' onClick={ () => { handleDelete( { name,rid: id } ) } } />
                <br />Likes : { !likes ? 0 : likes } <input type='button' value='like' onClick={ () => { handleAddLike( id,{ ...person,likes: likes + 1 } ) } } />
            </p>
        </div>
    )
}

export default Person