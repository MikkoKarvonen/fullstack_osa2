import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((a, b) => a + b);

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <div>yhteensä {total} tehtävää</div>
        </div>
    )
}

export default Content 