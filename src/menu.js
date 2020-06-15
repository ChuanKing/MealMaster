const { shuffle } = require('./util');

exports.assembleMenu = (meatDishes, veggieDishes, takeout, freestyle) => {
    const menu = [];

    while (meatDishes.length > 0 && veggieDishes.length > 0) {
        menu.push({
            meat: meatDishes.pop(),
            veggie: veggieDishes.pop()
        });
    }

    menu.forEach(item => {
        const totalEffort = item.meat.effort + item.veggie.effort;

        if (totalEffort > 100) {
            delete item.veggie;
        }
    });

    while (takeout > 0) {
        menu.push('takeout');
        takeout--;
    }

    while (freestyle > 0) {
        menu.push('freestyle');
        freestyle--;
    }

    return shuffle(menu);
}

