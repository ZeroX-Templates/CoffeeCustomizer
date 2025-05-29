// Coffee Types Data
const coffeeTypes = [
    {
        id: 'espresso',
        name: 'Espresso',
        description: 'Bold & intense',
        temperature: '195-205°F',
        brewTime: '25-30 seconds',
        baseCaffeine: 150,
        baseCalories: 5,
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Grind 18-20g of coffee beans to a fine consistency (size similar to table salt).',
            'Tamp the grounds with 30lbs of pressure to create even extraction surface.',
            'Heat water to 195-205°F (90-96°C) for optimal extraction temperature.',
            'Extract espresso for 25-30 seconds to achieve golden crema with tiger striping.',
            'The ideal shot should weigh 25-35g and have a honey-like flow.',
            'Add your selected milk and sweetness level to taste preference.'
        ]
    },
    {
        id: 'latte',
        name: 'Latte',
        description: 'Smooth & creamy',
        temperature: '150-160°F',
        brewTime: '4-5 minutes',
        baseCaffeine: 120,
        baseCalories: 120,
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Extract 1-2 shots of espresso using 18g of finely ground coffee.',
            'Pour cold milk into steaming pitcher, filling to bottom of spout.',
            'Steam milk to 150-160°F while creating microfoam texture.',
            'Tap pitcher to settle foam and swirl to integrate texture.',
            'Pour steamed milk from height, then bring pitcher close for latte art.',
            'Create rosetta, heart, or tulip patterns for professional presentation.',
            'Add sweetener and toppings according to your preferences.'
        ]
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Rich & frothy',
        temperature: '150-160°F',
        brewTime: '4-5 minutes',
        baseCaffeine: 120,
        baseCalories: 80,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Prepare espresso shot using 18g of finely ground coffee beans.',
            'Steam milk to create thick, velvety microfoam (1:1:1 ratio desired).',
            'Achieve foam consistency that can support sugar cube for 3 seconds.',
            'Pour equal parts espresso, steamed milk, and thick foam layer.',
            'Traditional cappuccino should be served in 5-6oz ceramic cup.',
            'Dust with cocoa powder, cinnamon, or nutmeg for enhanced flavor.',
            'Serve immediately while foam maintains its structure.'
        ]
    },
    {
        id: 'americano',
        name: 'Americano',
        description: 'Simple & strong',
        temperature: '195-205°F',
        brewTime: '3-4 minutes',
        baseCaffeine: 140,
        baseCalories: 10,
        image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Extract 2 shots of espresso using 20g of medium-fine ground coffee.',
            'Heat water to 195-205°F in a separate container for dilution.',
            'Add hot water to espresso in 1:2 ratio for authentic taste profile.',
            'Long shot method: Pull espresso longer for 45-60 seconds alternative.',
            'Reverse americano: Add espresso to hot water to preserve crema.',
            'Adjust strength by varying water-to-espresso ratio (1:1 to 1:3).',
            'Serve in 8-12oz cup with milk and sweetener options available.'
        ]
    },
    {
        id: 'coldbrew',
        name: 'Cold Brew',
        description: 'Refreshing & smooth',
        temperature: 'Room Temperature',
        brewTime: '12-24 hours',
        baseCaffeine: 200,
        baseCalories: 5,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Coarsely grind 100g of coffee beans (consistency of breadcrumbs).',
            'Use 1:8 coffee-to-water ratio for concentrate, 1:15 for ready-to-drink.',
            'Combine ground coffee with cold, filtered water in large container.',
            'Steep mixture for 12-24 hours at room temperature or refrigerated.',
            'Strain through fine mesh filter, then paper filter for clarity.',
            'Dilute concentrate 1:1 with water, milk, or serve over ice.',
            'Store concentrate in refrigerator for up to 2 weeks maximum.'
        ]
    },
    {
        id: 'macchiato',
        name: 'Macchiato',
        description: 'Espresso marked with foam',
        temperature: '195-205°F',
        brewTime: '2-3 minutes',
        baseCaffeine: 150,
        baseCalories: 15,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Extract single or double espresso shot into demitasse cup.',
            'Steam small amount of milk to create dense, creamy microfoam.',
            'Add single dollop of foam to "mark" the espresso surface.',
            'Traditional macchiato uses minimal milk - just a spoonful.',
            'Serve immediately in small 2-3oz ceramic cup for authenticity.',
            'Optional: Add dash of vanilla or caramel for modern variation.'
        ]
    },
    {
        id: 'mocha',
        name: 'Mocha',
        description: 'Chocolate coffee indulgence',
        temperature: '150-160°F',
        brewTime: '5-6 minutes',
        baseCaffeine: 120,
        baseCalories: 180,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Extract 1-2 shots of espresso using dark roast coffee beans.',
            'Heat milk to 150°F and add 1-2oz of chocolate syrup or powder.',
            'Steam milk-chocolate mixture until well integrated and frothy.',
            'Pour chocolate milk into espresso, creating layered effect.',
            'Top with whipped cream and chocolate shavings or cocoa powder.',
            'Garnish with marshmallows or chocolate chips for extra indulgence.',
            'Serve in large 10-12oz mug for optimal chocolate-coffee balance.'
        ]
    },
    {
        id: 'frappuccino',
        name: 'Frappuccino',
        description: 'Blended iced coffee treat',
        temperature: 'Cold/Frozen',
        brewTime: '3-4 minutes',
        baseCaffeine: 95,
        baseCalories: 200,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Brew strong coffee concentrate and let cool completely.',
            'Combine 4oz cold coffee, 6oz milk, 1 cup ice in blender.',
            'Add 2-3 tablespoons of sweetener or flavored syrup.',
            'Blend on high speed for 30-45 seconds until smooth and frothy.',
            'Pour into tall glass and top with whipped cream.',
            'Drizzle with caramel, chocolate, or fruit syrups.',
            'Serve with wide straw for optimal drinking experience.'
        ]
    },
    {
        id: 'turkish',
        name: 'Turkish Coffee',
        description: 'Traditional unfiltered brew',
        temperature: '160-180°F',
        brewTime: '3-4 minutes',
        baseCaffeine: 165,
        baseCalories: 7,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Grind coffee beans to powder-fine consistency (finer than espresso).',
            'Use traditional cezve (ibrik) for authentic preparation method.',
            'Combine 1 cup cold water with 1 tablespoon ground coffee.',
            'Add sugar to taste before heating (sugar cannot be added later).',
            'Heat slowly over low flame, stirring gently until it begins to foam.',
            'Remove from heat when foam rises, then return briefly.',
            'Pour into small cups, ensuring each gets some foam.'
        ]
    },
    {
        id: 'pourover',
        name: 'Pour Over',
        description: 'Manual brewing precision',
        temperature: '195-205°F',
        brewTime: '4-6 minutes',
        baseCaffeine: 130,
        baseCalories: 5,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Heat water to 195-205°F and grind 22g coffee to medium consistency.',
            'Rinse paper filter with hot water to remove papery taste.',
            'Place ground coffee in filter and create small well in center.',
            'Start timer and pour 40g water in circular motion for bloom.',
            'Wait 30 seconds for coffee to degas and expand.',
            'Continue pouring in slow, steady spirals every 30 seconds.',
            'Total brew time should be 4-6 minutes for optimal extraction.'
        ]
    },
    {
        id: 'french-press',
        name: 'French Press',
        description: 'Full immersion brewing',
        temperature: '195-205°F',
        brewTime: '4 minutes',
        baseCaffeine: 140,
        baseCalories: 8,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Coarsely grind 30g of coffee beans (sea salt consistency).',
            'Heat 500ml water to 195-205°F for optimal extraction.',
            'Add ground coffee to French press and pour small amount of water.',
            'Stir gently and let bloom for 30 seconds.',
            'Add remaining water and place lid with plunger up.',
            'Steep for exactly 4 minutes without disturbing.',
            'Press plunger down slowly and steadily, serve immediately.'
        ]
    },
    {
        id: 'aeropress',
        name: 'AeroPress',
        description: 'Pressure extraction method',
        temperature: '175-185°F',
        brewTime: '2-3 minutes',
        baseCaffeine: 110,
        baseCalories: 5,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
        instructions: [
            'Insert paper filter into cap and rinse with hot water.',
            'Assemble AeroPress in inverted position for better control.',
            'Add 17g of medium-fine ground coffee to chamber.',
            'Heat water to 175-185°F (cooler than other methods).',
            'Pour 250ml water and stir for 10 seconds.',
            'Steep for 1-2 minutes depending on desired strength.',
            'Flip onto cup and press down steadily for 20-30 seconds.'
        ]
    }
];

// Milk Types Data
const milkTypes = [
    { id: 'whole', name: 'Whole Milk', calories: 37, protein: 8, fat: 3.2, carbs: 4.8, sodium: 105, fiber: 0 },
    { id: 'skim', name: 'Skim Milk', calories: 21, protein: 8, fat: 0.2, carbs: 5.1, sodium: 130, fiber: 0 },
    { id: 'almond', name: 'Almond Milk', calories: 16, protein: 1, fat: 1.1, carbs: 1.0, sodium: 170, fiber: 0.5 },
    { id: 'oat', name: 'Oat Milk', calories: 33, protein: 3, fat: 1.5, carbs: 7.0, sodium: 120, fiber: 2.0 },
    { id: 'coconut', name: 'Coconut Milk', calories: 45, protein: 0.5, fat: 4.5, carbs: 6.0, sodium: 15, fiber: 0 },
    { id: 'soy', name: 'Soy Milk', calories: 25, protein: 6, fat: 2.0, carbs: 3.0, sodium: 90, fiber: 1.0 },
    { id: 'rice', name: 'Rice Milk', calories: 30, protein: 0.3, fat: 1.0, carbs: 9.0, sodium: 95, fiber: 0 },
    { id: 'cashew', name: 'Cashew Milk', calories: 12, protein: 0.5, fat: 2.0, carbs: 1.0, sodium: 160, fiber: 0 },
    { id: 'macadamia', name: 'Macadamia Milk', calories: 17, protein: 1, fat: 3.0, carbs: 1.0, sodium: 130, fiber: 0 },
    { id: 'hemp', name: 'Hemp Milk', calories: 20, protein: 2, fat: 3.0, carbs: 0.5, sodium: 110, fiber: 0.5 },
    { id: 'pea', name: 'Pea Protein Milk', calories: 22, protein: 8, fat: 1.5, carbs: 0.5, sodium: 130, fiber: 0.0 },
    { id: 'lactose-free', name: 'Lactose-Free Milk', calories: 35, protein: 8, fat: 3.0, carbs: 4.8, sodium: 105, fiber: 0 }
];

// Topping Types Data
const toppingTypes = [
    { id: 'cinnamon', name: 'Cinnamon', calories: 2, sugar: 0, icon: 'fas fa-star' },
    { id: 'cocoa', name: 'Cocoa Powder', calories: 12, sugar: 1, icon: 'fas fa-cookie-bite' },
    { id: 'whipped', name: 'Whipped Cream', calories: 25, sugar: 2, icon: 'fas fa-cloud' },
    { id: 'vanilla-syrup', name: 'Vanilla Syrup', calories: 35, sugar: 9, icon: 'fas fa-tint' },
    { id: 'caramel-syrup', name: 'Caramel Syrup', calories: 40, sugar: 10, icon: 'fas fa-candy-cane' },
    { id: 'hazelnut-syrup', name: 'Hazelnut Syrup', calories: 38, sugar: 9, icon: 'fas fa-circle' },
    { id: 'chocolate-chips', name: 'Chocolate Chips', calories: 45, sugar: 8, icon: 'fas fa-cookie' },
    { id: 'marshmallows', name: 'Marshmallows', calories: 23, sugar: 6, icon: 'fas fa-square' },
    { id: 'nutmeg', name: 'Nutmeg', calories: 3, sugar: 0, icon: 'fas fa-star' },
    { id: 'cardamom', name: 'Cardamom', calories: 2, sugar: 0, icon: 'fas fa-leaf' },
    { id: 'sea-salt', name: 'Sea Salt', calories: 0, sugar: 0, icon: 'fas fa-water' },
    { id: 'coconut-flakes', name: 'Coconut Flakes', calories: 15, sugar: 1, icon: 'fas fa-snowflake' },
    { id: 'honey', name: 'Honey Drizzle', calories: 21, sugar: 6, icon: 'fas fa-star' },
    { id: 'maple-syrup', name: 'Maple Syrup', calories: 26, sugar: 7, icon: 'fas fa-leaf' },
    { id: 'lavender', name: 'Lavender', calories: 1, sugar: 0, icon: 'fas fa-flower' },
    { id: 'espresso-powder', name: 'Espresso Powder', calories: 4, sugar: 0, icon: 'fas fa-coffee' },
    { id: 'none', name: 'No Toppings', calories: 0, sugar: 0, icon: 'fas fa-times' }
];