class Player{
	constructor(x, y) {
    	this.pos = createVector(x,y);
      const halfSize = floor(size/2)
    	this.topLeft = createVector(x-halfSize,y-halfSize);
      this.bottomRight = createVector(x+halfSize,y+halfSize);
      this.isTouching = true;
      this.v=0;
      this.isDead=false;
      this.touchingBlock = null;

  	}
  	draw(){
      console.log(this.isTouching);
  		fill(202,0,42);
  		rect(this.topLeft.x,this.topLeft.y,size,size)
      this.topLeft.y-=this.v;
      this.bottomRight.y-=this.v;
      this.pos.y-=this.v;
      if (!this.isTouching || !this.isTouchingBlock){
        this.v-=gravity;
      }

  	}
    drawDeath(){
      fill(162,0,34);
      rect(this.topLeft.x,this.topLeft.y,size,size);

    }
  	jump(){
      if (this.isTouching){
        this.v = jumpV;
        this.isTouching = false;
      }

    }
    checkBlockPlayer(){
      if (this.touchingBlock!=null){
        const topRight = createVector(this.touchingBlock.pos.x+size,ground-this.touchingBlock.pos.y);
        if (topRight.x<=(this.bottomRight.x-size)){
          this.isTouchingBlock=null;
          this.isTouching = false;
        }
      }
    }
    updatePlayerY(y){
      this.bottomRight.y = y;
      this.topLeft.y = this.bottomRight.y-size;
      this.pos.y = this.bottomRight.y-(size/2);
    }
  	collision(){
      if (this.bottomRight.y>=ground){
        
        this.isTouching = true;
        this.updatePlayerY(ground);
      }

    }	
    death(){
      this.drawDeath();
      noLoop();
      this.isDead = true;
      console.log("DEATH");
    }
}