class spike{
	constructor(girdX,gridY) {
    	this.pos = createVector(gridX*size,gridY*y);
  	}
  	draw(){
      strokeWeight(2);
      stroke(0);
  		fill(42);
  		rect(this.topLeft.x,this.topLeft.y,size,size)
      this.topLeft.y-=this.v;
      this.bottomRight.y-=this.v;
      this.pos.y-=this.v;
      if (!this.isTouching){
        this.v-=gravity;
      }

  	}
}
