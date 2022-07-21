import { PizzaIngredient, PizzaRecipe } from './interfaces';
import { Allergen, FoodType, IngredientName } from './enum';

export const getPizzaAllergens = (pizzaRecipe: PizzaRecipe): Allergen[] => {
    const pizzaAllergens = pizzaRecipe.pizzaIngredients
        .map((pizzaIngredient) => pizzaIngredient.ingredient.allergen)
        .filter((allergen) => !!allergen);

    return [...new Set(pizzaAllergens).values()];
};

export const getPizzaFoodTypes = (pizzaRecipe: PizzaRecipe): FoodType[] => {
    const pizzaFoodTypes = pizzaRecipe.pizzaIngredients.map((pizzaIngredient) => pizzaIngredient.ingredient.foodType);
    return [...new Set(pizzaFoodTypes).values()];
};

export const hasAllergens = (pizzaRecipe: PizzaRecipe, allergens: Allergen[]): boolean => {
    const pizzaRecipeAllergens = getPizzaAllergens(pizzaRecipe);

    for (const allergen of allergens) {
        if (pizzaRecipeAllergens.includes(allergen)) {
            return true;
        }
    }

    return false;
};

export const hasFoodTypes = (pizzaRecipe: PizzaRecipe, foodTypes: FoodType[]): boolean => {
    const pizzaFoodTypes = getPizzaFoodTypes(pizzaRecipe);

    for (const foodType of foodTypes) {
        if (pizzaFoodTypes.includes(foodType)) {
            return true;
        }
    }

    return false;
};

export const removeAllergens = (pizzaRecipe: PizzaRecipe, allergens: Allergen[]): PizzaRecipe => {
    const filteredIngredients: PizzaIngredient[] = pizzaRecipe.pizzaIngredients.filter(
        (pizzaIngredient) => !allergens.includes(pizzaIngredient.ingredient.allergen),
    );

    return {
        pizzaIngredients: filteredIngredients,
    };
};

export const removeFoodTypes = (pizzaRecipe: PizzaRecipe, foodTypes: FoodType[]): PizzaRecipe => {
    const filteredIngredients: PizzaIngredient[] = pizzaRecipe.pizzaIngredients.filter(
        (pizzaIngredient) => !foodTypes.includes(pizzaIngredient.ingredient.foodType),
    );

    return {
        pizzaIngredients: filteredIngredients,
    };
};

export const removeIngredients = (pizzaRecipe: PizzaRecipe, ingredientNames: IngredientName[]): PizzaRecipe => {
    const filteredIngredients: PizzaIngredient[] = pizzaRecipe.pizzaIngredients.filter(
        (pizzaIngredient) => !ingredientNames.includes(pizzaIngredient.ingredient.name),
    );

    return {
        pizzaIngredients: filteredIngredients,
    };
};

export const doubleIngredients = (pizzaRecipe: PizzaRecipe, ingredientNames: IngredientName[]): PizzaRecipe => {
    const doubledIngredients: PizzaIngredient[] = pizzaRecipe.pizzaIngredients.map((pizzaIngredient) => {
        const newAmount = ingredientNames.includes(pizzaIngredient.ingredient.name)
            ? pizzaIngredient.amount * 2
            : pizzaIngredient.amount;

        return {
            ...pizzaIngredient,
            amount: newAmount,
        };
    });

    return {
        pizzaIngredients: doubledIngredients,
    };
};

export const getCalories = (pizzaRecipe: PizzaRecipe): number => {
    return pizzaRecipe.pizzaIngredients
        .map(({ ingredient, amount }) => amount * ingredient.portionCalories)
        .reduce((a, b) => a + b);
};

export const PizzaService = {
    getPizzaAllergens,
    getPizzaFoodTypes,
    hasAllergens,
    hasFoodTypes,
    removeAllergens,
    removeFoodTypes,
    removeIngredients,
    doubleIngredients,
    getCalories,
};
