const initialState = {
    playerWins:0,
    computerWins:0,
    isFinished:false,
};
  
function rootReducer(state = initialState, action) {
    if(action.type==="UPDATE_RESULT"){
        if(action.payload==="p"){
            return{
                playerWins:state.playerWins+1,
                computerWins:state.computerWins,
                isFinished:state.isFinished
            }
        }
        if(action.payload==="c"){
            return{
                playerWins:state.playerWins,
                computerWins:state.computerWins+1,
                isFinished:state.isFinished
            }
        }
    }
    if(action.type==="IsFinished"){
        return{
            playerWins:state.playerWins,
            computerWins:state.computerWins,
            isFinished:!state.isFinished,
        }
    }
    return state;
};
  
export default rootReducer;