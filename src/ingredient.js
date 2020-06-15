const ingredients = require('../db/ingredient.json');

exports.getIngredient = () => {
    return ingredients;
}

exports.getIngredientFromMenu = (menu) => {

    var menuDishes = menu.reduce((dishes, item) => {
        if (item['meat']) dishes.push(item['meat']);
        if (item['veggie']) dishes.push(item['meat']);

        return dishes;
    }, []);

    return exports.getIngredientFromDish(menuDishes);
}

exports.getIngredientFromDish = (dishes) => {

    const ingredientSet = new Set();

    dishes.forEach(dish => {
        dish.ingredients
            .forEach(ingredientSet.add, ingredientSet);
    });

    return [...ingredientSet];
}

exports.calculateUseLeftIngredient = (dish) => {

    const leftIngredient = Object.keys(exports.getIngredient());
    const useIngredient = exports.getIngredientFromDish(dish);

    return leftIngredient.filter(r => useIngredient.includes(r));
}

