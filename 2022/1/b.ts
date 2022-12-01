const input = (await Deno.readTextFile("./input.txt")).split("\n\n");
// dict with each deer with a array of calorie
const calorieDict = input.map((line) => line.split("\n"));

// array with each deer's total calorie
const deerCalorie = calorieDict.map((arr) =>
  arr.reduce((pv, cr) => pv + +cr, 0)
);

deerCalorie.sort((a, b) => b - a);

const totalMaxTop3 = deerCalorie[0] + deerCalorie[1] + deerCalorie[2];
console.log({ totalMaxTop3 });
