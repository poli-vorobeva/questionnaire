import React from 'react'
import './MenuToggle.css'


const MenuToggle = props=>{
const cls = [ 'MenuToggle', '',
    ]
let symbolToggle = ''

    if(props.isOpen){
        symbolToggle = "x"
        cls.push( 'open')
    }else{
        symbolToggle = "="
    }
    return(
            <p
            className={cls.join(' ')}
            onClick={props.onToggle}
            
            >{symbolToggle}</p>
    )
}

export default MenuToggle