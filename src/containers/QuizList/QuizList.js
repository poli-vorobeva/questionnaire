import React, {Component} from 'react';
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'
 
class QuizList extends Component {
  
  renderQuizez(){
    return this.props.quizes.map((quiz) => {
      return (
        <li 
          key = {quiz.id}
        >
          <NavLink to={'/quiz/' +quiz.id}>
            Тест {quiz.name}
          </NavLink>
        </li>
      )
    })
  }
  /* componentDidMount(){
    axios.get('https://newquiz-962ec.firebaseio.com/quiz.json',
    {headers: {"apikey": "AIzaSyAtXsE8S7w4gX19B1WsQ8MoXuUorgEQVAY",'Accept': 'application/json'}
  }
    ).then(response => {
      console.log(response)
    }).catch(e => {console.log(e)
    })
  }
 */
componentDidMount(){
  this.props.fetchQuizes()

}
  render(){
    return (
      <div className={'QuizList'}>
        <div>
            <h1>Список Тестов</h1>
        </div>

        {
          this.props.loading && this.props.quizes.length !== 0
          ? <Loader/>
          : <ul>
              {this.renderQuizez()}
            </ul>
        }
        </div>
    )
  }
}

function mapStateToProps(state){
  return{
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch){
  return{
    fetchQuizes: () => dispatch(fetchQuizes())
    
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(QuizList);

