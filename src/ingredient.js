const ingredients = require('../db/ingredient.json');

exports.getIngredient = () => {
    return ingredients;
}

exports.getIngredientFromMenu = (menu) => {

    const ingredientSet = new Set();

    menu.forEach(item => {
        if (typeof item == 'string') {
            return ;
        }

        Object
            .values(item)
            .map(dish => dish.ingredients)
            .forEach(ingredients => {
                ingredients.forEach(ingredientSet.add, ingredientSet)
            });
    });

    return [...ingredientSet];
}