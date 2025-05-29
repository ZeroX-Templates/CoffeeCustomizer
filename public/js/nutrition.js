// Advanced Nutritional Calculation Engine

// Extraction efficiency algorithms based on brewing method
function calculateExtractionEfficiency(coffeeType, brewTime) {
    const timeMultipliers = {
        'espresso': 1.2, // High pressure, quick extraction
        'pourover': 1.0, // Standard efficiency
        'french-press': 0.95, // Full immersion
        'coldbrew': 0.85, // Cold extraction
        'turkish': 1.1, // Fine grind, full extraction
        'aeropress': 1.05, // Pressure assisted
        'latte': 0.9, // Milk dilution
        'cappuccino': 0.92, // Less milk than latte
        'macchiato': 1.0, // Minimal milk
        'mocha': 0.88, // Chocolate addition
        'frappuccino': 0.75, // Ice and additives
        'americano': 0.95 // Diluted espresso
    };
    
    return timeMultipliers[coffeeType] || 1.0;
}

// Caffeine absorption rate based on brewing method
function calculateCaffeineAbsorption(coffeeType) {
    const absorptionRates = {
        'espresso': 0.95, // High concentration, fast absorption
        'coldbrew': 0.88, // Smooth, slower absorption
        'turkish': 0.92, // Fine grind, high absorption
        'french-press': 0.85, // Full extraction
        'pourover': 0.87, // Clean extraction
        'aeropress': 0.89, // Pressure extraction
        'latte': 0.82, // Milk dilution
        'cappuccino': 0.84, // Less milk than latte
        'macchiato': 0.93, // Minimal milk
        'mocha': 0.80, // Chocolate addition
        'frappuccino': 0.75, // Ice and additives
        'americano': 0.90 // Diluted espresso
    };
    
    return absorptionRates[coffeeType] || 0.85;
}

// Milk nutritional impact algorithm
function calculateMilkNutrition(milk, volume = 6) {
    const volumeRatio = volume / 8; // per 8oz base
    
    return {
        calories: milk.calories * volumeRatio,
        protein: milk.protein * volumeRatio,
        fat: milk.fat * volumeRatio,
        carbs: milk.carbs * volumeRatio,
        fiber: milk.fiber * volumeRatio,
        sodium: milk.sodium * volumeRatio
    };
}

// Sugar metabolism and glycemic impact
function calculateGlycemicImpact(sugarLevel, toppingSugar) {
    const totalSugar = sugarLevel * 4 + toppingSugar;
    if (totalSugar <= 5) return 'Low';
    if (totalSugar <= 15) return 'Medium';
    return 'High';
}

// Antioxidant calculation based on coffee type and brewing method
function calculateAntioxidants(coffee) {
    const antioxidantLevels = {
        'espresso': 85, // High concentration
        'pourover': 92, // Clean extraction preserves antioxidants
        'french-press': 88, // Full immersion
        'coldbrew': 95, // Cold extraction preserves compounds
        'turkish': 90, // Fine grind, full extraction
        'aeropress': 87, // Pressure extraction
        'americano': 80, // Diluted
        'latte': 70, // Milk dilution
        'cappuccino': 72, // Less milk than latte
        'macchiato': 82, // Minimal milk
        'mocha': 65, // Chocolate addition
        'frappuccino': 60 // Ice and additives
    };
    
    return antioxidantLevels[coffee.id] || 75;
}

// Health score algorithm (0-100)
function calculateHealthScore(nutrition, coffee) {
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

// Main nutrition calculation function
function calculateNutrition(coffee, milk, sugarLevel, topping) {
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
    const milkNutrition = calculateMilkNutrition(milk, 6);
    calories += milkNutrition.calories;
    
    // Natural milk sugars vary by type
    if (milk.id.includes('oat')) sugar += 7;
    else if (milk.id.includes('rice')) sugar += 5;
    else sugar += 4;
    
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

// Advanced metrics calculation
function calculateAdvancedMetrics(coffee, milk, sugarLevel, topping, nutrition) {
    const caffeinePerOz = Math.round((nutrition.caffeine / 12) * 10) / 10; // Assuming 12oz drink
    const caloriesFromFat = Math.round((nutrition.fat * 9) * 10) / 10;
    
    // Sugar intensity classification
    let sugarIntensity;
    if (nutrition.sugar <= 5) sugarIntensity = 'Low';
    else if (nutrition.sugar <= 15) sugarIntensity = 'Medium';
    else if (nutrition.sugar <= 25) sugarIntensity = 'High';
    else sugarIntensity = 'Very High';
    
    // Protein quality assessment
    let proteinQuality;
    if (milk.id === 'whole' || milk.id === 'skim' || milk.id === 'lactose-free') {
        proteinQuality = 'Complete';
    } else if (milk.id === 'soy' || milk.id === 'pea') {
        proteinQuality = 'Complete';
    } else {
        proteinQuality = 'Plant-based';
    }
    
    const glycemicImpact = calculateGlycemicImpact(sugarLevel, topping.sugar);
    const healthScore = calculateHealthScore(nutrition, coffee);
    
    // Energy profile based on caffeine and sugar combination
    let energyProfile;
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