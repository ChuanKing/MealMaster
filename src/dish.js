const fs = require('fs');
const path = require('path');
const allDish = require('../db/dish.json');

const recoverRate = 20;
const outputFileName = 'dish.json';

exports.getAllDish = () => {
    return allDish;
}

exports.getAllMeats = () => {
    return allDish.filter(dish => dish.type === 'meat');
}

exports.getAllVeggies = () => {
    return allDish.filter(dish => dish.type === 'veggie');
}

exports.updateDish = (menu) => {
    const allDish = exports.getAllDish();
    const allMenuDish = menu.reduce((prev, curr) => {

        if (curr.meat) {
            prev[curr.meat.name] = curr.meat;
        }

        if (curr.veggie) {
            prev[curr.veggie.name] = curr.veggie;
        }

        return prev;
    }, {});

    allDish.forEach(dish => {
        dish.wish = dish.wish + recoverRate;
        dish.wish = Math.min(100, dish.wish);

        if (allMenuDish[dish.name]) {
            dish.wish = dish.wish - dish.wait;
            dish.wish = Math.max(0, dish.wish);
        }
    });

    saveDish(allDish);
}

function saveDish(dishes) {
    const outputFile = path.join(__dirname, '..', 'db', outputFileName);
    const steam = fs.createWriteStream(outputFile, { flags: 'w' });

    steam.write('[\n');

    dishes.forEach(dish => {
        if (dishes[dishes.length - 1] === dish) {
            steam.write(`    ${JSON.stringify(dish)}\n`);
        } else {
            steam.write(`    ${JSON.stringify(dish)},\n`);
        }
    });
    
    steam.write(']');

    steam.end();
}