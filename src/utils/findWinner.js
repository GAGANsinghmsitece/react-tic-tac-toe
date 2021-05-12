let findWinner=function(boxes){
    var winningCombinations=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(var i=0;i<winningCombinations.length;i++){
        var a=winningCombinations[i][0];
        var b=winningCombinations[i][1];
        var c=winningCombinations[i][2];

        if(boxes[a] && boxes[a]===boxes[b] && boxes[a]===boxes[c]){
            return boxes[a];
        }
    }
    let count=0;
    boxes.forEach(function(box){
        if(box!==null)
            count++;
    });
    if(count===9){
        return -2;//game ends in draw
    }
    return null;//there are still some possible moves in game
}
export default findWinner;