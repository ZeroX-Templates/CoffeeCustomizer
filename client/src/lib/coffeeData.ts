export interface CoffeeType {
  id: string;
  name: string;
  description: string;
  temperature: string;
  brewTime: string;
  instructions: string[];
  image: string;
  baseCaffeine: number;
  baseCalories: number;
}

export interface MilkType {
  id: string;
  name: string;
  calories: number;
  protein: number;
  icon: string;
}

export interface ToppingType {
  id: string;
  name: string;
  calories: number;
  sugar: number;
  icon: string;
}

export const coffeeTypes: CoffeeType[] = [
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
      'Grind 18-20g of coffee beans to a fine consistency for espresso extraction.',
      'Heat water to 195-205°F (90-96°C) for optimal extraction temperature.',
      'Extract espresso for 25-30 seconds to achieve perfect crema.',
      'Add your selected milk and sweetness level to taste.'
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
      'Steam milk to 150-160°F until creamy and smooth texture.',
      'Pour steamed milk into espresso, creating beautiful latte art.',
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
      'Steam milk to create thick, velvety microfoam texture.',
      'Pour equal parts espresso, steamed milk, and foam.',
      'Dust with cocoa powder or cinnamon for enhanced flavor.'
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
      'Heat water to 195-205°F in a separate container.',
      'Add hot water to espresso in 1:2 ratio for authentic taste.',
      'Adjust with milk and sweetener to your preference.'
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
      'Coarsely grind 100g of coffee beans for cold extraction.',
      'Combine ground coffee with 1 liter of cold water.',
      'Steep mixture for 12-24 hours at room temperature.',
      'Strain through fine filter and serve over ice with milk.'
    ]
  }
];

export const milkTypes: MilkType[] = [
  {
    id: 'whole',
    name: 'Whole Milk',
    calories: 37,
    protein: 8,
    icon: 'fas fa-tint'
  },
  {
    id: 'skim',
    name: 'Skim Milk',
    calories: 21,
    protein: 8,
    icon: 'fas fa-tint'
  },
  {
    id: 'almond',
    name: 'Almond Milk',
    calories: 16,
    protein: 1,
    icon: 'fas fa-seedling'
  },
  {
    id: 'oat',
    name: 'Oat Milk',
    calories: 33,
    protein: 3,
    icon: 'fas fa-wheat-awn'
  }
];

export const toppingTypes: ToppingType[] = [
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    calories: 2,
    sugar: 0,
    icon: 'fas fa-seedling'
  },
  {
    id: 'cocoa',
    name: 'Cocoa Powder',
    calories: 12,
    sugar: 1,
    icon: 'fas fa-cookie-bite'
  },
  {
    id: 'whipped',
    name: 'Whipped Cream',
    calories: 25,
    sugar: 2,
    icon: 'fas fa-cloud'
  },
  {
    id: 'none',
    name: 'No Toppings',
    calories: 0,
    sugar: 0,
    icon: 'fas fa-times'
  }
];
