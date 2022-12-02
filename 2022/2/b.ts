const input = (await Deno.readTextFile("./input.txt")).split("\n");

const scores = {
  A: 1,
  B: 2,
  C: 3,
};

type Choices = "A" | "B" | "C";

const isWin = (a: Choices, b: Choices) => {
  const aScore = scores[a];
  const bScore = scores[b];

  const diff = bScore - aScore;

  //   draw
  if (diff === 0) return false;

  if (diff === -1) return false;

  if (diff === 2) return false;

  return true;
};

const InputToOutcomes: Record<string, Outcome> = {
  X: "LOSS", //lose
  Y: "DRAW", //draw
  Z: "WIN", //win
};

type Outcome = "LOSS" | "DRAW" | "WIN";

const allPossibility: Array<Choices> = ["A", "B", "C"];

const getScoreFromPrediction = (
  opp: "A" | "B" | "C",
  pred: "X" | "Y" | "Z"
) => {
  let roundScore = 0;
  const oppScore = scores[opp];
  const outcome: Outcome = InputToOutcomes[pred];

  if (outcome === "DRAW") {
    // try possibility until draw
    roundScore += 3; //add 3 if draw

    roundScore += oppScore; //we get draw if same move so add the same oppScore
    console.log({ roundScore, draw: true });
    return roundScore;
  } else if (outcome === "WIN") {
    // try possibility until win
    roundScore += 6; //add 6 if win

    const possibleAns = allPossibility.filter((el) => el != opp);

    for (const ans of possibleAns) {
      if (isWin(opp, ans)) {
        roundScore += scores[ans];
        console.log({ roundScore, win: true });

        return roundScore;
      }
    }
  } else {
    // try possibility until loss
    // possibility reduces as draw is handled
    const possibleAns = allPossibility.filter((el) => el != opp);

    for (const ans of possibleAns) {
      if (!isWin(opp, ans)) {
        roundScore += scores[ans];
        console.log({ roundScore, loss: true });

        return roundScore;
      }
    }
  }
};

console.log(getScoreFromPrediction("A", "Y"));
console.log(getScoreFromPrediction("B", "X"));
console.log(getScoreFromPrediction("C", "Z"));

let TOTAL_SCORE = 0;
for (const round of input) {
  const [opp, you] = round.split(" ");

  const roundScore = getScoreFromPrediction(opp, you);

  TOTAL_SCORE += roundScore!;
}
console.log(TOTAL_SCORE);
