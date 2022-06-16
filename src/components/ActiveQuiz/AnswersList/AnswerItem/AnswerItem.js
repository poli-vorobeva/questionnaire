import React from 'react'
import './AnswerItem.css'

const AnswerItem = props =>{
const colorClass =['AnswerItem']

if(props.state === 'success') {
    colorClass.push('green')
}
if (props.state === 'error'){
    colorClass.push('red')
}

    return (
        <li 
            className ={colorClass.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}>
            { props.answer.text}
        </li>
    )
}  

export default AnswerItem