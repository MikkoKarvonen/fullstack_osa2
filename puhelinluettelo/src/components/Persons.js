import React from 'react'

const Persons = (props) => {
    return (
        <div>
            {props.persons.map((person,i) => (
                person.name.toLowerCase().includes(
                    props.search.toLowerCase())) ? 
                    <p key={person.id}>{person.name} {person.number} <button onClick={() => props.remove(person.id)}>poista</button></p> : ''
            )}
        </div>
    )
}

export default Persons