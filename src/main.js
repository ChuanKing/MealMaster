const { getAllMeats } = require('./dish');
const { getAllVeggies } = require('./dish');
const { shuffleDish } = require('./select');
const { assembleMenu } = require('./menu');
const { generateReport } = require('./report');

const { updateDish } = require('./dish');


const totalDays = 5;
const takeout = 1;
const freestyle = 1;

let meatDishes = getAllMeats();
let veggieDishes = getAllVeggies();

meatDishes = shuffleDish(meatDishes);
veggieDishes = shuffleDish(veggieDishes);

const menu = assembleMenu(totalDays, meatDishes, veggieDishes, takeout, freestyle);

generateReport(menu);
updateDish(menu);