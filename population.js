class Population {

  constructor(size) {
    this.players = [];
    this.fitnessSum = 0.0;
    this.gen = 1;
    this.bestPlayer =0;
    this.minStep = 10000;
    this.genPlayers = [];
    this.bestFitness = 0;
    this.solutionFound = false;

    for (var i = 0; i< size; i++) {
      this.players[i] = new Player(200,ground-(size/2));
    }
  }


  //------------------------------------------------------------------------------------------------------------------------------
  //show all players
   draw() {
    for (var i = 1; i< this.players.length; i++) {
      this.players[i].draw();
    }
    this.players[0].draw();
  }

  //-------------------------------------------------------------------------------------------------------------------------------
  //update all players
   update() {
    for (var i = 0; i< this.players.length; i++) {
      if (this.players[i].brain.step > this.minStep) {//if the player has already taken more steps than the best player has taken to reach the goal
        this.players[i].dead = true;//then it dead
      } else {
        this.players[i].update();
      }
    }
  }
   allPlayersDead() {
    for (var i = 0; i< this.players.length; i++) {
      if (this.players[i].reachedGoal){
        this.solutionFound = true;
      }
      if (!this.players[i].isDead && !this.players[i].reachedGoal) {
        return false;
      }
    }
    return true;
  }

   naturalSelection() {
    var newPlayers = [];//next gen
    this.setBestPlayer();
    this.calculateFitnessSum();

    //the champion lives on
    newPlayers[0] = this.players[this.bestPlayer].child();
    newPlayers[0].isBest = true;
    for (var i = 1; i< populationSize; i++) {
      //select parent based on fitness
      var parent = this.selectParent();

      //get baby from them
      newPlayers[i] = parent.child();
    }

    // this.players = newPlayers.slice();
    this.players = [];
    for(var i = 0 ; i< newPlayers.length;i++){
      this.players[i] = newPlayers[i];
    }
    this.gen ++;
  }

   calculateFitnessSum() {
    this.fitnessSum = 0;
    for (var i = 0; i< this.players.length; i++) {
      this.fitnessSum += this.players[i].fitness;
    }
  }
   selectParent() {
    var rand = random(this.fitnessSum);


    var runningSum = 0;

    for (var i = 0; i< this.players.length; i++) {
      runningSum+= this.players[i].fitness;
      if (runningSum > rand) {
        return this.players[i];
      }
    }

    //should never get to this point

    return null;
  }

  //------------------------------------------------------------------------------------------------------------------------------------------
  //mutates all the brains of the babies
   mutate() {
    for (var i = 1; i< this.players.length; i++) {
      this.players[i].brain.mutate(this.players[i].deathByDot, this.players[i].deathAtStep);
      this.players[i].gen = this.gen;
    }
    this.players[0].deathByDot = false;
    this.players[0].gen = this.gen;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------
  //finds the player with the highest fitness and sets it as the best player
   setBestPlayer() {
    var max = 0;
    var maxIndex = 0;
    for (var i = 0; i< this.players.length; i++) {
      if (this.players[i].fitness > max) {
        max = this.players[i].fitness;
        maxIndex = i;
      }
    }

    this.bestPlayer = maxIndex;

    if (max > this.bestFitness) {
      this.bestFitness = max;
      this.genPlayers.push(this.players[this.bestPlayer].child());
    }

    //if this player reached the goal then reset the minimum number of steps it takes to get to the goal
    if (this.players[this.bestPlayer].reachedGoal) {
      this.minStep = this.players[this.bestPlayer].brain.step;
      this.solutionFound = true;
    }
  }


 increaseMoves() {
    if (this.players[0].brain.directions.length < 120 && !this.solutionFound) {
      for (var i = 0; i< this.players.length; i++) {
        this.players[i].brain.increaseMoves();
      }
    }
  }
}