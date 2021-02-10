var ball;
var dbase;
var pos;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    dbase = firebase.database();

    var ballPos = dbase.ref("ball/position");
    ballPos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    dbase.ref("ball/position").set({
        x: pos.x+x,
        y: pos.y+y
    })
    
    
}

function readPosition(data) {
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}

function showError() {
    console.alert("Error");
}
