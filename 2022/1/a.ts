const input = (await Deno.readTextFile("./input.txt")).split("\n\n");
// dict with each deer with a array of calorie
const calorieDict = input.map((line) => line.split("\n"));

// array with each deer's total calorie
const deerCalorie = calorieDict.map((arr) =>
  arr.reduce((pv, cr) => pv + +cr, 0)
);

let max = deerCalorie[0];
let indexOfMax = "";

console.log({
  calorieDict: calorieDict.length,
  deerCalorie: deerCalorie.length,
});

for (const calIndex in deerCalorie) {
  const cal = deerCalorie[calIndex];
  console.log({ max, cal, calIndex });
  if (max < cal) {
    console.log("new max");
    max = cal;
    indexOfMax = calIndex;
  }
}

console.log(max, indexOfMax);
