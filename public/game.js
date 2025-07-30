const cross=$("#1");
const circle=$("#2");
const dropZone=$(".drop-zone");
var turn=0;
console.log(dropZone[0])

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
    newImg.attr("id", 'cloned-' + turn);
    newImg.attr("draggable",false)
    console.log(event.currentTarget);
    $(event.currentTarget).append(newImg);
    
    turn++;
    turnCheck();
});

function turnCheck(){
    if (turn%2 === 0) { 
        $("#1").attr("draggable",true);
        $("#2").attr("draggable",false);
    }
    else { 
        $("#1").attr("draggable",false);
        $("#2").attr("draggable",true);
    }
}