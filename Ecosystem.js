var rabbit;
var x = 0;
var updateBackground = new UpdateBackground();
function setup() {
  createCanvas(windowWidth,windowHeight);
  updateBackground.init(pixels);
  rabbit = [];
  for (var i = 0;i<100;i++){
    var temp = new Rabbit();
    temp.init();
    rabbit.push(temp);
  }
}


function draw() {
  updateBackground.render();
    for(var i = 0;i<100;i++){
    rabbit[i].move(i*i);
    rabbit[i].render();
  }
  x+=0.1;
}

function UpdateBackground(){
   this.init = function(){
     loadPixels();
     this.pos = pixels;
     for(var i = 0;i<width*2;i++){
       for(var j = 0;j<height*2;j++){
          var index = (i + j * 2*width) * 4;  
          var n = noise(i*0.002,j*0.002);
          if(n<0.3){
             this.pos[index+0] = 0; 
             this.pos[index+2] = Math.floor((n*n)/0.09*255);
             this.pos[index+1] = 0;
             this.pos[index+3] = 255;
          }
          else{
             this.pos[index+0] = 0; 
             this.pos[index+2] = 0;
             this.pos[index+1] = Math.floor((1-n)*(1-n)/0.49*150+105);
             this.pos[index+3] = 255;
          }
       }
     }
     for(i = 0;i<width;i++){
       for(j2 = 0;j2<1;j2++){
       var index1 = (i+j2*2*width)*4;
       this.pos[index1+0] = 255;
       this.pos[index1+3] = 255;
       this.pos[index1+1] = 0;
       this.pos[index1+2] = 0;
       
       }
     }
     console.log(this.pos);
   };
   this.render = function(){
     pixels = this.pos;
     updatePixels();
   };
  
}
 
function Rabbit(){
  
  this.r = 4;
  this.heading = 0;
  this.velocity = 0.5;
  this.tri = new Array(6);
  this.init = function(){
    do{
    this.pos = createVector(random()*width, random()*height);
    }while(updateBackground.pos[(Math.floor(this.pos.x*2) + Math.floor(this.pos.y*2)*2*width)*4+1]==0);
  };
  this.move = function(i){
  if( this.tri[4] >= width ||  this.tri[5] >= height ||  this.tri[4] <= 0 ||  this.tri[5 ] <= 0 || (updateBackground.pos[(Math.floor(this.tri[4]*2) + Math.floor(this.tri[5]*2)*2*width)*4+1]==0)){
    this.turn(22/7);
  }
    this.turn((noise(x+i)-0.5)*0.3);
    var direction = p5.Vector.fromAngle(this.heading-11/7).mult(this.velocity);
    this.pos.add(direction);
    this.tri[0] = this.pos.x+this.r*cos(this.heading)-this.r*sin(this.heading);
    this.tri[1] = this.pos.y+this.r*cos(this.heading)+this.r*sin(this.heading);
    this.tri[2] = this.pos.x-this.r*cos(this.heading)-this.r*sin(this.heading);
    this.tri[3] = this.pos.y+this.r*cos(this.heading)-this.r*sin(this.heading);
    this.tri[4] = this.pos.x+1.71*this.r*sin(this.heading);
    this.tri[5] = this.pos.y-1.71*this.r*cos(this.heading);
    
  }
  this.render = function(){
    fill(200);
    triangle(this.tri[0],this.tri[1],this.tri[2],this.tri[3],this.tri[4],this.tri[5]);
  };
  
  this.turn = function(angle) {
    this.heading += angle; 
  };
}
