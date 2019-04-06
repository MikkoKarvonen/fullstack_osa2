import React from 'react'

const Filter = (props) => {
    return (
        <div>
            rajaa näytettäviä <input value={props.search} onChange={props.change} />
        </div>
    )
}

export default Filter