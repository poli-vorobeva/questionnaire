import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results)
            .reduce((total,key)=>{
        if( props.results[key] === 'success'){
            total++
        }
        return total
    },0)

    return (
        <div className = { "FinishedQuiz"}>
            <ul>
                {props.quiz.map((quizItem, index) =>{
                    const cls = [
                         props.results[quizItem.id] === 'error'
                         ?"-" : "+",

                    ]
                    return(
                        <li key={index}>
                            <strong>{index+1}</strong>.&nbsp;
                            {quizItem.question}{cls}

                        </li> 
                    )
                })}
               
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type = "primary">Повторить</Button>
                <Link to="/">
                <Button onClick={props.onRetry} type = "success ">Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz