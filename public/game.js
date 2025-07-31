const cross=$("#cross");
const circle=$("#circle");
const dropZone=$(".drop-zone");
var player1=[];
var player2=[];
var turn=0;


cross.on('dragstart', (event) => {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
});

circle.on('dragstart', (event) => {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
});

dropZone.on("dragover",(event)=>{
    event.preventDefault();
});

dropZone.on("drop",(event)=>{
    console.log(event);
    const id = event.originalEvent.dataTransfer.getData('text/plain');
    const newImg= $("#"+id).clone();

    const currentBlock=event.currentTarget.id; //The grid block where the X or O was placed
    console.log(id);
    
    //Checking for overlap
    if (player1.includes(currentBlock) || player2.includes(currentBlock)){
        alert("This space is picked. Pick an empty space");
        console.log(turn);
        return;
    }
    newImg.attr("id", currentBlock);
    newImg.attr("draggable",false);
    console.log(event.currentTarget);
    $(event.currentTarget).append(newImg);
    
    if (id==="cross"){ player1.push(currentBlock); }
    else{ player2.push(currentBlock); }
    console.log(player1,player2);
    turn++;
    turnCheck();
});

function turnCheck(){
    if (turn%2 === 0) { 
        //Player 1 turn

        $("#cross").attr("draggable",true);
        $("#circle").attr("draggable",false);

        $("h1").text("Player 1:");
        $("h1").css({"border-bottom":"solid red"});
        $(".board").css({"border-color":"red"});
    } else { 
        //player 2 turn
        $("#cross").attr("draggable",false);
        $("#circle").attr("draggable",true);

        $("h1").text("Player 2:");
        $("h1").css({"border-bottom":"solid blue"});
        $(".board").css({"border-color":"blue"});
    }
}