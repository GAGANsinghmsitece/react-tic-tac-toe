let computerTurn=function(boxes){
    for(var i=0;i<boxes.length;i++)
        if(boxes[i]===null)
            return i;
}
export default computerTurn;