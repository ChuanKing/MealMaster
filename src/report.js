const { getIngredientFromMenu } = require('./ingredient');

exports.generateReport = (menu) => {

    const disName = getDishName(menu);
    const needIngredients = getIngredientFromMenu(menu);

    console.log(`本周菜单: ${disName.join(', ')}`);
    console.log(`所需材料: ${needIngredients.join(', ')}`);
}

function getDishName(menu) {

    return menu.map(item => {

        if (typeof item == 'string') {
            return item;
        }

        const dish = [];

        if (item.meat && item.meat.name) {
            dish.push(item.meat.name);
        }

        if (item.veggie && item.veggie.name) {
            dish.push(item.veggie.name);
        }

        return dish.join('+');
    });
}