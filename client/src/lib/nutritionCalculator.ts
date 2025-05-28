import { CoffeeType, MilkType, ToppingType } from './coffeeData';

export interface NutritionInfo {
  calories: number;
  sugar: number;
  caffeine: number;
  protein: number;
}

export function calculateNutrition(
  coffee: CoffeeType,
  milk: MilkType,
  sugarLevel: number,
  topping: ToppingType
): NutritionInfo {
  // Base coffee nutrition
  let calories = coffee.baseCalories;
  let sugar = 0;
  let caffeine = coffee.baseCaffeine;
  let protein = 0;

  // Add milk nutrition (assuming 6oz serving)
  calories += milk.calories;
  sugar += 5; // Natural milk sugars
  protein += milk.protein;

  // Add sugar (16 calories and 4g per teaspoon)
  calories += sugarLevel * 16;
  sugar += sugarLevel * 4;

  // Add topping nutrition
  calories += topping.calories;
  sugar += topping.sugar;

  return {
    calories: Math.round(calories),
    sugar: Math.round(sugar),
    caffeine,
    protein: Math.round(protein)
  };
}
