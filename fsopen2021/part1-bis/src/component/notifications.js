import React from 'react'

const Notification = ( { message,type } ) => {
    if ( message === null )
    {
        return null
    }
    return (
        <div className={ type }>
            { message }
        </div>
    )
}

const ErrorNotification = ( { message } ) => <Notification message={ message } type='error' />

const SuccessNotification = ( { message } ) => <Notification message={ message } type='success' />


export { ErrorNotification,SuccessNotification } 