const allDish = require('../db/dish.json');

exports.getAllDish = () => {
    return allDish;
}

exports.getAllMeats = () => {
    return allDish.filter(dish => dish.type === 'meat');
}

exports.getAllVeggies = () => {
    return allDish.filter(dish => dish.type === 'veggie');
}