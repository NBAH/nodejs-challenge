import { PizzaService } from './pizza-recipe.service';
import { PizzaRecipe } from './interfaces';
import { Allergen, FoodType, IngredientName } from './enum';

describe('PizzaService', () => {
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

    const pizzaRecipe: PizzaRecipe = {
        pizzaIngredients: [
            { ingredient: beef, amount: 1 },
            { ingredient: mozzarella, amount: 2 },
            { ingredient: salmon, amount: 3 },
            { ingredient: jalapeno, amount: 4 },
            { ingredient: champignons, amount: 5 },
        ],
    };

    describe('getPizzaAllergens', () => {
        it('Should return JALAPENO', () => {
            expect(PizzaService.getPizzaAllergens(pizzaRecipe)).toEqual([Allergen.JALAPENO]);
        });

        it('Should return empty list', () => {
            expect(PizzaService.getPizzaAllergens({ pizzaIngredients: [{ ingredient: beef, amount: 1 }] })).toEqual([]);
        });
    });

    describe('getPizzaFoodTypes', () => {
        it('Should return all food types', () => {
            expect(PizzaService.getPizzaFoodTypes(pizzaRecipe).sort()).toEqual(
                [FoodType.MUSHROOM, FoodType.VEGETABLE, FoodType.MEAT, FoodType.CHEESE, FoodType.FISH].sort(),
            );
        });

        it('Should return MEAT', () => {
            expect(PizzaService.getPizzaFoodTypes({ pizzaIngredients: [{ ingredient: beef, amount: 1 }] })).toEqual([
                FoodType.MEAT,
            ]);
        });
    });

    describe('hasFoodTypes', () => {
        it('Should return true', () => {
            const result = PizzaService.hasFoodTypes(pizzaRecipe, [FoodType.CHEESE, FoodType.MUSHROOM]);
            expect(result).toEqual(true);
        });

        it('Should return false', () => {
            const result = PizzaService.hasFoodTypes({ pizzaIngredients: [{ ingredient: beef, amount: 1 }] }, [
                FoodType.CHEESE,
            ]);
            expect(result).toEqual(false);
        });
    });

    describe('hasAllergens', () => {
        it('Should return true', () => {
            const result = PizzaService.hasAllergens(pizzaRecipe, [Allergen.JALAPENO]);
            expect(result).toEqual(true);
        });

        it('Should return false', () => {
            const result = PizzaService.hasAllergens(pizzaRecipe, [Allergen.SOY]);
            expect(result).toEqual(false);
        });
    });

    describe('removeAllergens', () => {
        it('Should remove jalapeno', () => {
            const result = PizzaService.removeAllergens(pizzaRecipe, [Allergen.JALAPENO]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: beef, amount: 1 },
                    { ingredient: mozzarella, amount: 2 },
                    { ingredient: salmon, amount: 3 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });

        it('Should not remove anything', () => {
            const result = PizzaService.removeAllergens(pizzaRecipe, [Allergen.SOY]);
            expect(result).toEqual(pizzaRecipe);
        });
    });

    describe('removeFoodTypes', () => {
        it('Should remove beef', () => {
            const result = PizzaService.removeFoodTypes(pizzaRecipe, [FoodType.MEAT]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: mozzarella, amount: 2 },
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });

        it('Should remove beef and mozzarella', () => {
            const result = PizzaService.removeFoodTypes(pizzaRecipe, [FoodType.MEAT, FoodType.CHEESE]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });
    });

    describe('removeIngredients', () => {
        it('Should remove beef', () => {
            const result = PizzaService.removeIngredients(pizzaRecipe, [IngredientName.BEEF]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: mozzarella, amount: 2 },
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });

        it('Should remove beef and mozzarella', () => {
            const result = PizzaService.removeIngredients(pizzaRecipe, [
                IngredientName.BEEF,
                IngredientName.MOZZARELLA,
            ]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });
    });

    describe('doubleIngredients', () => {
        it('Should double beef amount', () => {
            const result = PizzaService.doubleIngredients(pizzaRecipe, [IngredientName.BEEF]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: beef, amount: 2 },
                    { ingredient: mozzarella, amount: 2 },
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });

        it('Should double beef and mozzarella', () => {
            const result = PizzaService.doubleIngredients(pizzaRecipe, [
                IngredientName.BEEF,
                IngredientName.MOZZARELLA,
            ]);
            expect(result).toEqual({
                pizzaIngredients: [
                    { ingredient: beef, amount: 2 },
                    { ingredient: mozzarella, amount: 4 },
                    { ingredient: salmon, amount: 3 },
                    { ingredient: jalapeno, amount: 4 },
                    { ingredient: champignons, amount: 5 },
                ],
            });
        });
    });

    describe('getCalories', () => {
        it('Should return 900', () => {
            const result = PizzaService.getCalories(pizzaRecipe);
            expect(result).toEqual(900);
        });
    });
});
