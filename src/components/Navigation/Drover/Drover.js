import React,{Component} from 'react'
import './Drover.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
//рендерим наборр ссылок, которые показываем в меню


class Drover extends Component {

    clickHandler = ()=>{
        this.props.onClose()
    }
    renderLinks(links){
        return links.map((link, index) =>{
            return (
                <li key={index}>
                    <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={'active'}
                    onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    
    render(){
        const cls = ['Drover']

        if(!this.props.isOpen){
            cls.push( 'close')
        }

        const links=[
            {to: '/', label:'Список', exact: true}            
        ]
        if(this.props.isAuthenticated){
            links.push({to: '/quiz-creator', label:'Создать тест', exact: false})
            links.push({to: '/logout', label:'Выйти', exact: true})
            links.push({to: '/', label:'Список', exact: true})
        }else{
            links.push({to: '/auth', label:'Авторизация', exact: false})
        }

        return(
             <React.Fragment>
                <nav className ={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default connect()(Drover)