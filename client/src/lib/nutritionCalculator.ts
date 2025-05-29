import { CoffeeType, MilkType, ToppingType } from './coffeeData';

export interface NutritionInfo {
  calories: number;
  sugar: number;
  caffeine: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  sodium: number;
  antioxidants: number;
}

export interface AdvancedMetrics {
  caffeinePerOz: number;
  caloriesFromFat: number;
  sugarIntensity: 'Low' | 'Medium' | 'High' | 'Very High';
  proteinQuality: 'Complete' | 'Incomplete' | 'Plant-based';
  glycemicImpact: 'Low' | 'Medium' | 'High';
  healthScore: number; // 0-100
  energyProfile: 'Quick Burst' | 'Sustained' | 'Long-lasting';
}

// Advanced brewing extraction algorithms
function calculateExtractionEfficiency(coffeeType: string, brewTime: string): number {
  const timeMultipliers = {
    'espresso': 1.2, // High pressure, quick extraction
    'pour-over': 1.0, // Standard efficiency
    'french-press': 0.95, // Full immersion
    'cold-brew': 0.85, // Cold extraction
    'turkish': 1.1, // Fine grind, full extraction
    'aeropress': 1.05, // Pressure assisted
    'default': 1.0
  };
  
  return timeMultipliers[coffeeType as keyof typeof timeMultipliers] || timeMultipliers.default;
}

// Caffeine absorption rate based on brewing method
function calculateCaffeineAbsorption(coffeeType: string): number {
  const absorptionRates = {
    'espresso': 0.95, // High concentration, fast absorption
    'cold-brew': 0.88, // Smooth, slower absorption
    'turkish': 0.92, // Fine grind, high absorption
    'french-press': 0.85, // Full extraction
    'pour-over': 0.87, // Clean extraction
    'aeropress': 0.89, // Pressure extraction
    'default': 0.85
  };
  
  return absorptionRates[coffeeType as keyof typeof absorptionRates] || absorptionRates.default;
}

// Milk nutritional impact algorithm
function calculateMilkNutrition(milk: MilkType, volume: number = 6): object {
  const baseNutrition = {
    calories: milk.calories * (volume / 8), // per 8oz base
    protein: milk.protein * (volume / 8),
    fat: 0,
    carbs: 0,
    fiber: 0,
    sodium: 0
  };

  // Specific milk nutritional profiles
  const milkProfiles = {
    'whole': { fat: 3.2, carbs: 4.8, sodium: 105, fiber: 0 },
    'skim': { fat: 0.2, carbs: 5.1, sodium: 130, fiber: 0 },
    'almond': { fat: 1.1, carbs: 1.0, sodium: 170, fiber: 0.5 },
    'oat': { fat: 1.5, carbs: 7.0, sodium: 120, fiber: 2.0 },
    'coconut': { fat: 4.5, carbs: 6.0, sodium: 15, fiber: 0 },
    'soy': { fat: 2.0, carbs: 3.0, sodium: 90, fiber: 1.0 },
    'rice': { fat: 1.0, carbs: 9.0, sodium: 95, fiber: 0 },
    'cashew': { fat: 2.0, carbs: 1.0, sodium: 160, fiber: 0 },
    'macadamia': { fat: 3.0, carbs: 1.0, sodium: 130, fiber: 0 },
    'hemp': { fat: 3.0, carbs: 0.5, sodium: 110, fiber: 0.5 },
    'pea': { fat: 1.5, carbs: 0.5, sodium: 130, fiber: 0.0 },
    'lactose-free': { fat: 3.0, carbs: 4.8, sodium: 105, fiber: 0 }
  };

  const profile = milkProfiles[milk.id as keyof typeof milkProfiles] || milkProfiles.whole;
  
  return {
    ...baseNutrition,
    fat: profile.fat * (volume / 8),
    carbs: profile.carbs * (volume / 8),
    fiber: (profile.fiber || 0) * (volume / 8),
    sodium: profile.sodium * (volume / 8)
  };
}

// Sugar metabolism and glycemic impact
function calculateGlycemicImpact(sugarLevel: number, toppingSugar: number): string {
  const totalSugar = sugarLevel * 4 + toppingSugar;
  if (totalSugar <= 5) return 'Low';
  if (totalSugar <= 15) return 'Medium';
  return 'High';
}

// Antioxidant calculation based on coffee type and roast
function calculateAntioxidants(coffee: CoffeeType): number {
  const antioxidantLevels = {
    'espresso': 85, // High concentration
    'pour-over': 92, // Clean extraction preserves antioxidants
    'french-press': 88, // Full immersion
    'cold-brew': 95, // Cold extraction preserves compounds
    'turkish': 90, // Fine grind, full extraction
    'aeropress': 87, // Pressure extraction
    'americano': 80, // Diluted
    'latte': 70, // Milk dilution
    'cappuccino': 72, // Less milk than latte
    'macchiato': 82, // Minimal milk
    'mocha': 65, // Chocolate addition
    'frappuccino': 60 // Ice and additives
  };
  
  return antioxidantLevels[coffee.id as keyof typeof antioxidantLevels] || 75;
}

// Health score algorithm (0-100)
function calculateHealthScore(nutrition: any, coffee: CoffeeType): number {
  let score = 50; // Base score
  
  // Caffeine optimization (moderate caffeine is beneficial)
  if (nutrition.caffeine >= 80 && nutrition.caffeine <= 200) score += 15;
  else if (nutrition.caffeine > 200) score -= 10;
  
  // Sugar penalty
  if (nutrition.sugar <= 5) score += 20;
  else if (nutrition.sugar <= 15) score += 5;
  else score -= Math.min(20, nutrition.sugar - 15);
  
  // Protein bonus
  score += Math.min(15, nutrition.protein * 2);
  
  // Antioxidant bonus
  score += Math.min(10, nutrition.antioxidants / 10);
  
  // Calorie consideration
  if (nutrition.calories <= 50) score += 10;
  else if (nutrition.calories > 300) score -= 15;
  
  // Fiber bonus
  score += nutrition.fiber * 3;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculateNutrition(
  coffee: CoffeeType,
  milk: MilkType,
  sugarLevel: number,
  topping: ToppingType
): NutritionInfo {
  const extractionEfficiency = calculateExtractionEfficiency(coffee.id, coffee.brewTime);
  const caffeineAbsorption = calculateCaffeineAbsorption(coffee.id);
  
  // Base coffee nutrition with extraction efficiency
  let calories = coffee.baseCalories * extractionEfficiency;
  let sugar = 0;
  let caffeine = Math.round(coffee.baseCaffeine * caffeineAbsorption);
  let protein = 0.5; // Minimal protein in coffee
  let fat = 0.1;
  let carbs = 1.0;
  let fiber = 0.1;
  let sodium = 5;

  // Add milk nutrition with sophisticated calculations
  const milkNutrition = calculateMilkNutrition(milk, 6) as any;
  calories += milkNutrition.calories;
  sugar += milk.id.includes('oat') ? 7 : milk.id.includes('rice') ? 5 : 4; // Natural milk sugars
  protein += milkNutrition.protein;
  fat += milkNutrition.fat;
  carbs += milkNutrition.carbs;
  fiber += milkNutrition.fiber;
  sodium += milkNutrition.sodium;

  // Add sugar with metabolic considerations
  const sugarCalories = sugarLevel * 16;
  const sugarGrams = sugarLevel * 4;
  calories += sugarCalories;
  sugar += sugarGrams;
  carbs += sugarGrams;

  // Add topping nutrition with interaction effects
  calories += topping.calories;
  sugar += topping.sugar;
  
  // Topping-specific nutritional additions
  if (topping.id === 'whipped') {
    fat += 2.5;
    protein += 0.3;
  } else if (topping.id.includes('syrup')) {
    carbs += topping.sugar;
    sodium += 10;
  } else if (topping.id === 'chocolate-chips') {
    fat += 2.8;
    fiber += 0.5;
  } else if (topping.id === 'coconut-flakes') {
    fat += 1.5;
    fiber += 1.0;
  }

  // Calculate antioxidants
  const antioxidants = calculateAntioxidants(coffee);

  const finalNutrition = {
    calories: Math.round(calories),
    sugar: Math.round(sugar),
    caffeine,
    protein: Math.round(protein * 10) / 10,
    fat: Math.round(fat * 10) / 10,
    carbs: Math.round(carbs * 10) / 10,
    fiber: Math.round(fiber * 10) / 10,
    sodium: Math.round(sodium),
    antioxidants: Math.round(antioxidants)
  };

  return finalNutrition;
}

export function calculateAdvancedMetrics(
  coffee: CoffeeType,
  milk: MilkType,
  sugarLevel: number,
  topping: ToppingType,
  nutrition: NutritionInfo
): AdvancedMetrics {
  const caffeinePerOz = Math.round((nutrition.caffeine / 12) * 10) / 10; // Assuming 12oz drink
  const caloriesFromFat = Math.round((nutrition.fat * 9) * 10) / 10;
  
  // Sugar intensity classification
  let sugarIntensity: 'Low' | 'Medium' | 'High' | 'Very High';
  if (nutrition.sugar <= 5) sugarIntensity = 'Low';
  else if (nutrition.sugar <= 15) sugarIntensity = 'Medium';
  else if (nutrition.sugar <= 25) sugarIntensity = 'High';
  else sugarIntensity = 'Very High';
  
  // Protein quality assessment
  let proteinQuality: 'Complete' | 'Incomplete' | 'Plant-based';
  if (milk.id === 'whole' || milk.id === 'skim' || milk.id === 'lactose-free') {
    proteinQuality = 'Complete';
  } else if (milk.id === 'soy' || milk.id === 'pea') {
    proteinQuality = 'Complete';
  } else {
    proteinQuality = 'Plant-based';
  }
  
  const glycemicImpact = calculateGlycemicImpact(sugarLevel, topping.sugar) as 'Low' | 'Medium' | 'High';
  const healthScore = calculateHealthScore(nutrition, coffee);
  
  // Energy profile based on caffeine and sugar combination
  let energyProfile: 'Quick Burst' | 'Sustained' | 'Long-lasting';
  if (nutrition.caffeine > 150 && nutrition.sugar > 15) {
    energyProfile = 'Quick Burst';
  } else if (nutrition.caffeine >= 100 && nutrition.sugar <= 10) {
    energyProfile = 'Long-lasting';
  } else {
    energyProfile = 'Sustained';
  }
  
  return {
    caffeinePerOz,
    caloriesFromFat,
    sugarIntensity,
    proteinQuality,
    glycemicImpact,
    healthScore,
    energyProfile
  };
}
