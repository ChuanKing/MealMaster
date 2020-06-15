const { getRandomInt } = require('./util');
const { calculateUseLeftIngredient } = require("./ingredient");

const retry = 5;

exports.pickupXDishesSaveMode = (dishes, x) => {

    let finalSelectedDished = [];
    let finalUsedLeftIngredients = 0;

    for (var i = 0; i < retry; i++) {
        const selectedDished = exports.pickupXDishes(dishes, x);
        const usedLeftIngredients = calculateUseLeftIngredient(selectedDished);

        if (usedLeftIngredients.length >= finalUsedLeftIngredients) {
            finalSelectedDished = selectedDished;
            finalUsedLeftIngredients = usedLeftIngredients.length;
        }
    }

    console.log(`使用了 ${finalUsedLeftIngredients} 之前的食材`);
    return finalSelectedDished;
}

exports.pickupXDishes = (dishes, x) => {

    dishes = [...dishes];
    const selectedDishes = [];

    while(x > 0 && dishes.length > 0) {
        const selectedDish = exports.pickupDish(dishes);
        selectedDishes.push(selectedDish);
        x--;
    }

    return selectedDishes;
}

exports.pickupDish = (dishes) => {
    const totalWeight = dishes.reduce((total, dishes) => total + dishes.wish, 0);
    const random = getRandomInt(totalWeight);

    let i = 0, sum = 0;

    for (; i < dishes.length; i++) {
        var wish = dishes[i].wish;
        if (random >= sum && random < sum + wish) {
            break;
        }
        sum += wish;
    }

    return dishes.splice(i, 1)[0];
}