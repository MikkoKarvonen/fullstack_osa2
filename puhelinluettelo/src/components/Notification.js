import React from 'react'

const Notification = (props) => {
    return (
        <div className={props.style}>
            {props.message}
        </div>
    )
}

export default Notification