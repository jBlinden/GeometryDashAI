class Brain {
  constructor(size){
    this.directions = [];
    this.step =0;
    this.randomize(size);

  }

  randomize(size) {
    for (let i = 0; i< size; i++) {
      this.directions.push(this.getRandomBinary());
    }
  }

  getRandomBinary() {
    return floor(random(2));
  }

  clone() {
    var clone = new Brain(this.directions.length);
    for (var i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i];
    }
    return clone;
  }


  mutate(died, deathStep) {
    //chance that any vector in directions gets changed
    for (var i =0; i< this.directions.length; i++) {
      var rand = random(1);
      if (died && i > deathStep - 10) {
        rand = random(0.2);
      }

      if (rand < mutationRate) {
        //set this direction as a random direction
        this.directions[i] = this.getRandomBinary();
      }
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //increases the number of elements in directions by 5
 increaseMoves() {
   for(var i = 0 ; i< increaseMovesBy ;i++){
     this.directions.push(this.getRandomBinary());
   }
  }
}