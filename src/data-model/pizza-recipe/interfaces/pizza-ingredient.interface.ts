import { FoodType, Allergen, IngredientName } from '../enum';

export interface Ingredient {
    name: IngredientName;
    foodType: FoodType;
    allergen?: Allergen;
    portionCalories: number; // Amount of calories per 1 portion of ingredient
}

export interface PizzaIngredient {
    ingredient: Ingredient;
    amount: number;
}
