import { Allergen, FoodType, IngredientName } from './pizza-recipe/enum';
import { PizzaRecipe } from './pizza-recipe/interfaces';
import { PizzaService } from './pizza-recipe';

const beef = { name: IngredientName.BEEF, foodType: FoodType.MEAT, portionCalories: 100 };
const salmon = { name: IngredientName.SALMON, foodType: FoodType.FISH, portionCalories: 50 };
const mozzarella = { name: IngredientName.MOZZARELLA, foodType: FoodType.CHEESE, portionCalories: 200 };
const jalapeno = {
    name: IngredientName.JALAPENO,
    foodType: FoodType.VEGETABLE,
    allergen: Allergen.JALAPENO,
    portionCalories: 50,
};
const champignons = { name: IngredientName.CHAMPIGNONS, foodType: FoodType.MUSHROOM, portionCalories: 10 };

const pizzaRecipes: PizzaRecipe[] = [
    {
        pizzaIngredients: [
            { ingredient: beef, amount: 1 },
            { ingredient: mozzarella, amount: 2 },
            { ingredient: salmon, amount: 3 },
            { ingredient: jalapeno, amount: 4 },
            { ingredient: champignons, amount: 5 },
        ],
    },
    {
        pizzaIngredients: [{ ingredient: champignons, amount: 5 }],
    },
    {
        pizzaIngredients: [
            { ingredient: beef, amount: 1 },
            { ingredient: mozzarella, amount: 2 },
            { ingredient: salmon, amount: 3 },
        ],
    },
];

// Find only pizzas with mushrooms
const pizzasWithMushrooms = pizzaRecipes.filter((pizzaRecipe) =>
    PizzaService.hasFoodTypes(pizzaRecipe, [FoodType.MUSHROOM]),
);
console.log('pizzas with mushrooms', JSON.stringify(pizzasWithMushrooms, null, 2));

// Find pizzas with soy
const pizzasWithSoy = pizzaRecipes.filter((pizzaRecipe) => PizzaService.hasAllergens(pizzaRecipe, [Allergen.SOY]));
console.log('pizzas with soy', JSON.stringify(pizzasWithSoy, null, 2));

const selectedPizzaRecipe = pizzaRecipes[0];
console.log('selected pizza recipe', JSON.stringify(selectedPizzaRecipe, null, 2));

// Remove Jalapeno from pizza recipe
const pizzaWithoutJalapeno = PizzaService.removeIngredients(selectedPizzaRecipe, [IngredientName.JALAPENO]);
console.log('pizza without jalapeno', JSON.stringify(pizzaWithoutJalapeno, null, 2));

// Double cheese
const pizzaWithDoubleMozzarella = PizzaService.doubleIngredients(pizzaWithoutJalapeno, [IngredientName.MOZZARELLA]);
console.log('pizza with double mozzarella', JSON.stringify(pizzaWithDoubleMozzarella, null, 2));

// Pizza without meat
const pizzaWithoutMeat = PizzaService.removeFoodTypes(pizzaWithDoubleMozzarella, [FoodType.MEAT]);
console.log('pizza without meat', JSON.stringify(pizzaWithoutMeat, null, 2));

// Calories for the resulting recipe
console.log(PizzaService.getCalories(pizzaWithoutMeat));
