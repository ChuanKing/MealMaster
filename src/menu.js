const { shuffle } = require('./util');

exports.assembleMenu = (totalDays, meatDishes, veggieDishes, takeout, freestyle) => {
    const menu = [];
    const existingDish = new Set();
    let totalDish = totalDays - takeout - freestyle;

    while (totalDish > 0) {

        const meat = getNextQualifiedDish(meatDishes, null, existingDish);
        const veggie = getNextQualifiedDish(veggieDishes, meat, existingDish);

        menu.push({meat, veggie});

        existingDish.add(meat.name);
        existingDish.add(veggie.name);

        totalDish--;
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

function getNextQualifiedDish(dishes, todayDish, existingDishSet) {

    let dish;

    while (!dish && dishes.length > 0) {
        var candidate = dishes.shift();
        
        var notSameDay = candidate.notSameDay;
        var notSameWeek = candidate.notSameWeek;

        if (todayDish && notSameDay.indexOf(todayDish) >= 0) {
            continue;
        }

        var qualify = true;
        
        notSameWeek.forEach(d => {
            qualify = qualify && !existingDishSet.has(d);
        });

        if (qualify) {
            dish = candidate;
        }
    }

    return dish;
}