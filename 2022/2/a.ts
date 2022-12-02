const input = (await Deno.readTextFile("./input.txt")).split("\n");

const scores = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const getTotalScores = (opp: "A" | "B" | "C", you: "X" | "Y" | "Z") => {
  let choiceScore = scores[you];
  const oppChoiceScore = scores[opp];

  if (isDraw(oppChoiceScore, choiceScore)) {
    choiceScore += 3;
    console.log("draw", choiceScore);
    return choiceScore;
  }

  // if not draw
  if (isWin(opp, you)) {
    choiceScore += 6;
    return choiceScore;
  }
  return choiceScore;
};

const isDraw = (a: number, b: number) => a === b;

/*
R   P       Win
1 - 2 = -1  0
R   S
1 - 3 = -2  1

P   R       
2 - 1 = 1   1
2 - 3 = -1   0

3 - 1 = 2   0
3 - 2 = 1   1

*/
const isWin = (a: "A" | "B" | "C", b: "X" | "Y" | "Z") => {
  const aScore = scores[a];
  const bScore = scores[b];

  const diff = bScore - aScore;

  //   draw
  if (diff === 0) return false;

  if (diff === -1) return false;

  if (diff === 2) return false;

  return true;
};

// tests
// console.log(isWin("A", "Y")); //t
// console.log(isWin("B", "X")); //f
// console.log(isWin("C", "Z")); //f

// console.log(isWin("C", "Y")); //f
// console.log(isWin("A", "X")); //f
// console.log(isWin("B", "Z")); //t

// console.log(isWin("B", "Y")); //f
// console.log(isWin("C", "X")); //t
// console.log(isWin("A", "Z")); //f

// console.log(getTotalScores("C", "Z"));
let TOTAL_SCORE = 0;
for (const round of input) {
  const [opp, you] = round.split(" ");

  const roundScore = getTotalScores(opp, you);

  TOTAL_SCORE += roundScore;
}

console.log(TOTAL_SCORE);
