import React from 'react';
import { connect } from "react-redux";

import Block from './block.js';
import findWinner from '../utils/findWinner.js';
import computerTurn from '../utils/computerTurn.js';
import updateResult from '../actions/index.js';
import '../assets/base.css';

class Board extends React.Component{
  constructor(props){
    super(props);
		this.state={
      computerWins:this.props.computerWins,
      playerWins:this.props.playerWins,
			boxes:Array(9).fill(null),
			IsNext:true,
      isFinished:false,//true means x(player) and false means o(computer)
		}
    this.restartGame=this.restartGame.bind(this);
    this.getcomputerTurn=this.getcomputerTurn.bind(this);
  }

  
  getcomputerTurn(boxes){
    var i=computerTurn(boxes);
    boxes[i]='o';
    this.setState({
      boxes: boxes,
      xIsNext: this.state.xIsNext,
      playerWins:this.state.playerWins,
      computerWins:this.state.computerWins,
      isFinished:false,
    });
  }

  restartGame(){
    this.setState({
      boxes:Array(9).fill(null),
			IsNext:true,
      playerWins:this.props.playerWins,
      computerWins:this.props.computerWins,
      isFinished:false,
    });
  }

  handleBoxClick(index) {
    const boxes = this.state.boxes.slice();
    if (findWinner(boxes) || boxes[index]) {
        return;
    }
    boxes[index] = this.state.xIsNext ? 'o' : 'x';
    this.setState({
        boxes: boxes,
        xIsNext: this.state.xIsNext,
        playerWins:this.state.playerWins,
        computerWins:this.state.computerWins,
        isFinished:false,
    });
    setTimeout(()=> { //Start the timer
      this.getcomputerTurn(boxes);}  //After 1 second, set render to true
  , 1000);
    
  }  

  componentDidUpdate(){
    const res=findWinner(this.state.boxes);
    if(res==='x' && this.state.isFinished===false){
      this.setState({
        boxes: this.state.boxes,
        xIsNext: this.state.xIsNext,
        playerWins:this.state.playerWins,
        computerWins:this.state.computerWins,
        isFinished:true,
      });
      this.props.dispatch(updateResult("p"));
    }else if(res==='o' && this.state.isFinished===false){
      this.setState({
        boxes: this.state.boxes,
        xIsNext: this.state.xIsNext,
        playerWins:this.state.playerWins,
        computerWins:this.state.computerWins,
        isFinished:true,
      });
      this.props.dispatch(updateResult("c"));
    }
  }
    render(){
      const winner=findWinner(this.state.boxes);
      let message='';
      if(winner===-2){
        message="game is drawn";
      }else if(winner==='x'){
        message="Player wins";
        
      }else if(winner==='o'){
        message="computer wins";
      }
      if(winner===null)
        return(
          <div>
            <div className="board">
              <div className="board-row">
                <Block value={this.state.boxes[0]} onClick={()=>{this.handleBoxClick(0)}}/>
                <Block value={this.state.boxes[1]} onClick={()=>{this.handleBoxClick(1)}}/>
                <Block value={this.state.boxes[2]} onClick={()=>{this.handleBoxClick(2)}}/>
              </div>
              <div className="board-row">
                <Block value={this.state.boxes[3]} onClick={()=>{this.handleBoxClick(3)}}/>
                <Block value={this.state.boxes[4]} onClick={()=>{this.handleBoxClick(4)}}/>
                <Block value={this.state.boxes[5]} onClick={()=>{this.handleBoxClick(5)}}/>
              </div>
              <div className="board-row">
                <Block value={this.state.boxes[6]} onClick={()=>{this.handleBoxClick(6)}}/>
                <Block value={this.state.boxes[7]} onClick={()=>{this.handleBoxClick(7)}}/>
                <Block value={this.state.boxes[8]} onClick={()=>{this.handleBoxClick(8)}}/>
              </div>
            </div>
            <div className="ScoreBoard">
              <div className="Participant">
                <div className="Score">{this.state.playerWins}</div>
                <div className="ParticipantName"> Player</div>
              </div>
              <div className="Participant">
                <div className="Score">{this.state.computerWins}</div>
                <div className="ParticipantName"> Computer</div>
              </div>
            </div>
          </div> 
        );
      else{
        return(
          <div>
            <div className="board">
              <div className="Message">{message}</div>
              <div className="RestartButton" onClick={this.restartGame}>Restart Game</div>
            </div>
            <div className="ScoreBoard">
              <div className="Participant">
                <div className="Score">{this.state.playerWins}</div>
                <div className="ParticipantName"> Player</div>
              </div>
              <div className="Participant">
                <div className="Score">{this.state.computerWins}</div>
                <div className="ParticipantName"> Computer</div>
              </div>
            </div>
          </div>
        );
      }
    }
}

const mapStateToProps=function(state){
  return{
    playerWins:state.playerWins,
    computerWins:state.computerWins,
    isFinished:state.isFinished
  }
}
export default connect(mapStateToProps)(Board);