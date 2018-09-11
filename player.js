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
      this.fitness=0;
      this.brain = new Brain(numberOfSteps);
      this.gen = 1;
      this.step=0;
      this.reachedGoal = false;
      this.isBest = false;
  	}
  	draw(){
      strokeWeight(4);
      stroke(0);
      if (!this.isDead){
        if (this.isBest){
          fill(0,128,0);
        }
        else{
          fill(202,0,42);
        }
        rect(this.topLeft.x,this.topLeft.y,size,size)
      }
      else {
        fill(162,0,34);
        rect(this.topLeft.x,this.topLeft.y,size,size)
      }
    }
    update(){
      if (!this.isDead){
        //console.log("ONE PLAYER");
        //console.log(this.isTouching,this.v,this.pos.y);
        this.step+=1;
        this.fitness = this.step;
  		  
        this.topLeft.y-=this.v;
        this.bottomRight.y-=this.v;
        this.pos.y-=this.v;
        this.collision();
        if (!this.isTouching || !this.isTouchingBlock){
          this.v-=gravity;
        }
        if ((this.step%3)==0){
          if (this.brain.directions[this.brain.step]==1){
            this.jump();
          }
          this.brain.step+=1;
        }
        if (this.step>=goal){
          console.log("STOP")
          noLoop();
          this.reachedGoal=true;
        }
        
      }
      else{
        this.topLeft.x-=5;
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
      //noLoop();
      this.isDead = true;
    }
    child(){
      var child = new Player(200,ground-(size/2));
      child.brain = this.brain.clone();
      return child;


    }
}