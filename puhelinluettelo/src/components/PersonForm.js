import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                nimi: <input value={props.newName}
                    onChange={props.nameChange} />
            </div>
            <div>
                numero: <input value={props.newNumber}
                    onChange={props.numChange} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default PersonForm