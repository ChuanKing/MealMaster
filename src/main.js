const { getAllMeats } = require('./dish');
const { getAllVeggies } = require('./dish');
const { shuffleDish } = require('./select');
const { assembleMenu } = require("./menu");
const { getReport } = require("./report");
const { getIngredientFromMenu } = require("./ingredient");

const totalDays = 2;
const takeout = 0;
const freestyle = 0;

let meatDishes = getAllMeats();
let veggieDishes = getAllVeggies();

meatDishes = shuffleDish(meatDishes);
veggieDishes = shuffleDish(veggieDishes);

console.log(JSON.stringify(meatDishes[0]));

const menu = assembleMenu(totalDays, meatDishes, veggieDishes, takeout, freestyle);

const disName = getReport(menu);
const needIngredients = getIngredientFromMenu(menu);

// TODO: move to report
console.log(`本周菜单: ${disName.join(', ')}`);
console.log(`所需材料: ${needIngredients.join(', ')}`);
