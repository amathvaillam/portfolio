import React,{ useState } from 'react'

const LoginForm = ( { handleLogin } ) => {

    const [ username,setUsername ] = useState( '' )
    const [ password,setPassword ] = useState( '' )

    const submitLogin = ( event ) => {
        event.preventDefault()
        handleLogin( { username,password } )
        setUsername( '' )
        setPassword( '' )
    }

    const handleUsername = ( event ) => setUsername( event.target.value )
    const handlePassword = ( event ) => setPassword( event.target.value )


    return (
        <>
            <form onSubmit={ submitLogin }>
                <div>
                    Username: <input
                        value={ username }
                        onChange={ handleUsername }
                        name="Username"
                    />
                </div>
                <div>
                    Password: <input
                        type="password"
                        value={ password }
                        onChange={ handlePassword }
                        name="Password"
                    />
                </div>
                <div>
                    <button type="submit"> Connect</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm