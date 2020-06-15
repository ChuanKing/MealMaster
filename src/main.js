const { getAllMeats } = require('./dish');
const { getAllVeggies } = require('./dish');
const { pickupXDishesSaveMode } = require('./select');
const { assembleMenu } = require("./menu");
const { getReport } = require("./report");
const { getIngredientFromMenu } = require("./ingredient");

const totalDays = 5;
const takeout = 1;
const freestyle = 1;

const meatDishes = getAllMeats();
const veggieDishes = getAllVeggies();

const selectedMeatDishes = pickupXDishesSaveMode(meatDishes, totalDays - takeout - freestyle);
const selectedVeggieDishes = pickupXDishesSaveMode(veggieDishes, totalDays - takeout - freestyle);

const menu = assembleMenu(selectedMeatDishes, selectedVeggieDishes, takeout, freestyle);

const disName = getReport(menu);
const needIngredients = getIngredientFromMenu(menu);

console.log(`本周菜单: ${disName.join(', ')}`);
console.log(`所需材料: ${needIngredients.join(', ')}`);
