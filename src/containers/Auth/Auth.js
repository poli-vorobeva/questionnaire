import React, {Component} from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/Input'
import is from  'is_js'
import {connect} from 'react-redux'
import { auth } from '../../store/actions/auth'


class Auth extends Component {
  
  state ={
    isFormValid: false,
    formControls: {
      email: { 
        value:'',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation : {
          required: true,
          email: true
        }
      },
      password: {
        value:'',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Ввыдите корректный пароль',
        valid: false,
        touched: false,
        validation : {
          required: true,
          minLength: 6

      }
    }
  }
  }

  registerHandler = () =>{
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )}

  loginHandler = () =>{
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )}
  submitHandler= event =>{
    event.preventDefault()
  }

validateControl( value, validation ) {
    if (!validation) {//те если мы не передавали набор параметриов,
      //значит валидировать контрол нам не надо
      return true
    }
    //если проверка не прошла, и мы определили валидаешн, то
    let isValid = true
  //на основе объекта конфигурации validation будем изменять локальную переменную isValid
      if ( validation.required) {
        isValid = value.trim() !== '' && isValid
      }
      if ( validation.email) {
        isValid = is.email(value) && isValid
      }
      if ( validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }

  return isValid
}

  onChangeHandler = (event, controlName)=> {


    //создаем копию нашего стейта, что бы при его измениниии не было мутации стейт
    const formControls = { ...this.state.formControls }
    //также создаем копию нужного контрола
    const control = { ...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
//после того как мы внесли изменения, надо заново пересохранить нашу копию,
//что бы изменения применились
    formControls[controlName] = control
    
    let isFormValid = true
//сы должны проитись по всем оюъектам массива formControls и спросить у каждого
//controla валидный он или нет
    Object.keys( formControls).forEach( name =>{
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls, isFormValid
    })
  }

  renderIputs() {
    return Object.keys(this.state.formControls).map((controlName, index)=>{
          const control = this.state.formControls[controlName]
      
      return (
          <Input
            key={controlName + index}
            type = {control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={ event => this.onChangeHandler(event, controlName)}
          />
        )
    })
  }
  
  render(){
    return (
    <div className={'Auth'}>
      <div>
      <h1>Авторизация</h1>
      <form onSubmit={this.submitHandler} className={'AuthForm'}>
        
        {this.renderIputs()}

          <Button 
            type="success"
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}//если форма не валидная, то блокируем кнопки
            >
              Войти
          </Button>
          
          <Button 
            type="primary"
            onClick={this.registerHandler}
            disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
          </Button>
      </form>
      </div>
    </div>
        
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    auth:(email,password,isLogin)=> dispatch(auth(
      email,password,isLogin))
  }
}
export default connect (null,mapDispatchToProps)(Auth);
