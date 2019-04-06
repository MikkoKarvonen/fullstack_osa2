import React from 'react'

const Persons = (props) => {
    return (
        <div>
            {props.persons.map((person,i) => (person.name.toLowerCase().includes(props.search.toLowerCase())) ? <p key={i}>{person.name} {person.number}</p> : '')}
        </div>
    )
}

export default Persons