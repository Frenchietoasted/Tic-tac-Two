const cross=$(".cross");
const circle=$(".circle");
const dropZone=$(".drop-zone");
console.log(cross);
var player1=[];
var player2=[];
var turn=0;
var gameStart=false;
var player1Score=0;
var player2Score=0;
var highlight;
function stopDrag(event){
    event.preventDefault();
}

$(".player").on("touchstart mousedown", stopDrag);//pauses game till keypress

$(document).on("keypress", function() {
    if (!gameStart){
        gameStart=true;
        turn=0;
        $(".drop-zone").empty();
        $("h1").text("Player 1 will have the first move");
        $("#p1").off("touchstart mousedown",stopDrag);
    }}
);

function turnCheck(){
    if (turn<6){
        if (turn%2 === 0) { 
            //Player 1 turn

            $("#p1").off("touchstart mousedown",stopDrag);
            $("#p2").on("touchstart mousedown",stopDrag);

            $("h1").text("Player One:");
            $("h1").css({"border-bottom":"solid red"});
            $(".board").css({"border-color":"red"});
        } else { 
            //player 2 turn
            $("#p1").on("touchstart mousedown",stopDrag);
            $("#p2").off("touchstart mousedown",stopDrag);

            $("h1").text("Player Two:");
            $("h1").css({"border-bottom":"solid blue"});
            $(".board").css({"border-color":"blue"});
        }
    } else {
        //New rules from here
        $(".player").on("touchstart mousedown", stopDrag);
        $("a>img").css({"display":"none"});
        if (turn%2 === 0) { 
            highlight=player1.shift();
            $(".drop-zone#"+highlight).addClass("highlight");

            $("#cross"+highlight).off("touchstart mousedown dragstart",stopDrag);
            $("#cross"+highlight).attr("draggable",true);

            $("h1").text("Player One:");
            $("h1").css({"border-bottom":"solid red"});
            $(".board").css({"border-color":"red"});
        } else {
            highlight=player2.shift();
            $(".drop-zone#"+highlight).addClass("highlight");

            $("#circle"+highlight).off("touchstart mousedown dragstart",stopDrag);
            $("#circle"+highlight).attr("draggable",true);

            $("h1").text("Player Two:");
            $("h1").css({"border-bottom":"solid blue"});
            $(".board").css({"border-color":"blue"});
        }
    }
}

function winCheck(playerMoves,id){
    var combo;
    for (let winCombo of winOptions) {
        if (winCombo.every(cell => playerMoves.includes(cell))) {
            combo= winCombo; // The winning combo
        }
    }
    if (combo){
        console.log("win",combo);
        restartGame(id);
    }
}

function restartGame(winner){
    $("h1").html(`Player ${winner} WINS!!<br>Press any key to restart`);
    $(".player").on("touchstart mousedown", stopDrag);
    var winnerScore=winner===1? ++player1Score: ++player2Score;
    console.log
    $("#score"+winner).text(`Score: ${winnerScore}`)
    if (turn>5) {
        $("a>img").css({"display":"block"});
    }
    player1=[];
    player2=[];
    gameStart=false;
}

$(document).on("dragstart", ".cross", function (event) {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
});

$(document).on("dragstart", ".circle", function (event) {
    event.originalEvent.dataTransfer.setData('text/plain', event.target.id);
});

dropZone.on("dragover",(event)=>{
    event.preventDefault();
});

dropZone.on("drop",(event)=>{
    console.log(event);
    event.preventDefault();

    
    const draggedId = event.originalEvent.dataTransfer.getData("text/plain");
    const original = $("#" + draggedId);
    const newImg = original.clone();

    const currentBlock=event.currentTarget.id; //The grid block where the X or O was placed
    console.log(draggedId);

    //Checking for overlap
    if (player1.includes(currentBlock) || player2.includes(currentBlock)){
        alert("This space is picked. Pick an empty space");
        console.log(turn);
        return;
    }

    //After turn 5 replacing the elements
    if (turn>5) {
        $(".drop-zone#"+highlight).removeClass("highlight");
        $(".drop-zone#"+highlight).empty();
    }
    
    if (draggedId.includes("cross")){
        newImg.attr("id", "cross"+currentBlock);
    } else {
        newImg.attr("id", "circle"+currentBlock);
    }
    
    newImg.attr("draggable",false);
    $("#img"+currentBlock).on("touchstart mousedown dragstart", stopDrag);
    console.log("crosses:",cross);
    $(event.currentTarget).append(newImg);
    
    if (draggedId.includes("cross")){ 
        player1.push(currentBlock); 
        winCheck(player1,"1");
    } else { 
        player2.push(currentBlock);
        winCheck(player2,"2"); 
    }
    console.log(player1,player2);
    turn++;
    console.log(turn);
    if (gameStart){ turnCheck(); }
});

const winOptions=[
    ["0","1","2"],["3","4","5"],["6","7","8"], //horizontal win options
    ["0","3","6"],["1","4","7"],["2","5","8"], //vertical win options
    ["0","4","8"],["2","4","6"] //diagonal wins
]
$(document).on("dragstart", ".cross", function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", this.id);
});
$(document).on("dragstart", ".circle", function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", this.id);
});
