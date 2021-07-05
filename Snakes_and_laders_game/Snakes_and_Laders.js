
/** Constructor of Snakes and Ladder game for two players */
function SnakesLadders() {
  this.curentPlayer = "1";
  this.player1 = 0;
  this.player2 = 0;
  this.gameOver = false;
  /* 0 1  2  3  4  5  6  7  8  9 10*/
  this.board = [0, 0, 38, 0, 0, 0, 0, 14, 31, 0, 0,
    0, 0, 0, 0, 26, 6, 0, 0, 0, 0,/*10*/
    42, 0, 0, 0, 0, 0, 0, 84, 0, 0,/*20*/
    0, 0, 0, 0, 0, 44, 0, 0, 0, 0,/*30*/
    0, 0, 0, 0, 0, 25, 0, 0, 11, 0,/*40*/
    67, 0, 0, 0, 0, 0, 0, 0, 0, 0,/*50*/
    0, 19, 0, 60, 0, 0, 0, 0, 0, 0,/*60*/
    91, 0, 0, 53, 0, 0, 0, 98, 0, 0,/*70*/
    0, 0, 0, 0, 0, 0, 94, 0, 68, 0,/*80*/
    0, 88, 0, 0, 75, 0, 0, 0, 80, 0] /*90*/
};
/** One rolling of the dies  
  * @param {number} die1 - the number of die1 
  * @param {number} die2 - the number of die2 
  * @return {string} "Player n is on square n" 
  *                  or "Player n Wins!" when player on 100th square.
  *                  or ""Game over!" when privious player already won.
  */
SnakesLadders.prototype.play = function (die1, die2) {
  let out = "nope";
  if (this.gameOver) { return "Game over!" }
    else {
      out = this.forvard(die1 + die2);
      this.isWinner();
      this.isDouble(die1, die2);
    }
  return out;
}


/**
 * Do certain steps forward.
 * @param {number} number - The sum of dies.
 * @return {string} to function play()"Player n is on square n" or "Player n Wins!" when player on 100th square.
 */
SnakesLadders.prototype.forvard = function (number) {
  let out = "";

  if (this["player" + this.curentPlayer] + number > 100) { 
    this["player" + this.curentPlayer] = 100 - (this["player" + this.curentPlayer] + number - 100) 
    }
    else { this["player" + this.curentPlayer] += number };

  this.ifSnakeOrLadder();

  if (this.isWinner()) { out = `Player ${this.curentPlayer} Wins!` }
    else { out = `Player ${this.curentPlayer} is on square ${this["player" + this.curentPlayer]}` }

  return out;
};
/**
 * Check if current playear reach 100th square
 * change gameOver flag in ninja style :)
 * @return {boolean} true if current playear reach 100th square
 */
SnakesLadders.prototype.isWinner = function () {
  if (this["player" + this.curentPlayer] == 100) {
    //    console.log (`Player ${this.curentPlayer} Wins!`);
    this.gameOver = true;
    return true;
  }
  //  console.log ("not winner yet")
};

/**
 * Check if current playear step on square with snake head or ladder bottom
 * if true moving current player by snake or ladder 
 */
SnakesLadders.prototype.ifSnakeOrLadder = function () {
  //  console.log("is snake or ladder?","playerSquare=",this["player"+this.curentPlayer]);
  if (this.board[this["player" + this.curentPlayer]] != 0) { this.moveTo(this.board[this["player" + this.curentPlayer]]) }
};

/** Moving curent player directly to certain square
 * @param {number} number - the number of square (tail of snake or top of ladder)
 */
SnakesLadders.prototype.moveTo = function (number) {
  this["player" + this.curentPlayer] = number;
  //console.log(`Player ${this.curentPlayer} is on square ${this["player"+this.curentPlayer]}`)
};
/** Cheking if roll double 
 * changes the player in a ninja style ;)
 * @param {number} die1 - the number of die1 
 * @param {number} die2 - the number of die2 
 * 
 */
SnakesLadders.prototype.isDouble = function (die1, die2) {
  if (die1 == die2) { }
  else { this.nextPlayer() };
};

/** Change the player */
SnakesLadders.prototype.nextPlayer = function () {
  if (this.curentPlayer == 1) { this.curentPlayer = 2 }
  else { this.curentPlayer = 1 };
}

