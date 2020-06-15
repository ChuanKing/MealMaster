const { getRandomInt } = require('./util');

exports.pickupXDishes = (dishes, x) => {
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