const _ = require('lodash');
const { getIngredient } = require('./ingredient');

const batchSize = 3;
const wishWeight = 0.7;
const ingredientWeight = 0.3;

exports.shuffleDish = (dishes) => {

    const shuffledDish = [];

    while (dishes.length > 0) {
        dishes = _.shuffle(dishes);

        const best = getBest(dishes.slice(0, batchSize));
        _.remove(dishes, d => d == best);
        shuffledDish.push(best);
    }

    return shuffledDish
}

function getBest(candidates) {

    let best = candidates[0];
    let bestScore = calculateScore(best);

    candidates.forEach(candidate => {
        const currentScore = calculateScore(candidate)

        if (bestScore < currentScore) {
            best = candidate;
            bestScore = currentScore;
        }
    });

    return best;
}

function calculateScore(dish) {

    const wishScore = dish.wish;
    const ingredientsScore = calculateIngredientsScore(dish.ingredients);

    return wishScore * wishWeight + ingredientsScore * ingredientWeight;
}

function calculateIngredientsScore(ingredients) {

    let score = 0;
    const ingredientInStore = getIngredient();

    ingredients.forEach(ingredient => {
        if (ingredientInStore[ingredient]) {
            score++;
        }
    });

    return score;
}