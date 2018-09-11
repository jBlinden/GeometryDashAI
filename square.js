class square{
	constructor(gridX,gridY) {
    	this.pos = createVector(gridX*size,gridY*size);
  	}
  	draw(){
      this.pos.x-=speed;
      strokeWeight(2);
      stroke(0);
  		fill(42);

  		rect(this.pos.x,ground-this.pos.y,size,size)
  	}
    collision(player){
      const topLeft = createVector(this.pos.x,ground-this.pos.y);
      const bottomRight = createVector(this.pos.x+size,ground-this.pos.y+size);

      if (player.topLeft.x >= bottomRight.x || topLeft.x >= player.bottomRight.x){
        //console.log("OUTSIDE X");
        return;
      }
      if (player.topLeft.y >= bottomRight.y || topLeft.y >= player.bottomRight.y){
        //console.log("OUTSIDE Y");
        return;
      }
      //console.log("HI");
     //console.log(player.bottomRight,topLeft);
      if (abs(player.bottomRight.y-topLeft.y)<=20){
        player.updatePlayerY(topLeft.y);
        player.isTouching = true;
        player.touchingBlock = this;
        player.v=0;
        return;
      }
      //rect(this.pos.x,ground-this.pos.y,size,size)
      player.death();
    }
}