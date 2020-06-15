const { getAllMeats } = require('./dish');
const { getAllVeggies } = require('./dish');
const { pickupXDishes } = require('./select');
const { assembleMenu } = require("./menu");
const { getReport } = require("./report");
const { getIngredientFromMenu } = require("./ingredient");
const { getIngredient } = require("./ingredient");

const totalDays = 5;
const takeout = 1;
const freestyle = 1;

const leftIngredients = getIngredient();
const meatDishes = getAllMeats();
const veggieDishes = getAllVeggies();

const selectedMeatDishes = pickupXDishes(meatDishes, totalDays - takeout - freestyle);
const selectedVeggieDishes = pickupXDishes(veggieDishes, totalDays - takeout - freestyle);

const menu = assembleMenu(selectedMeatDishes, selectedVeggieDishes, takeout, freestyle);

const disName = getReport(menu);
const needIngredients = getIngredientFromMenu(menu);

console.log(`本周菜单: ${disName.join(', ')}`);
console.log(`所需材料: ${needIngredients.join(', ')}`);
console.log(`还有食材: ${Object.keys(leftIngredients).join(', ')}`);