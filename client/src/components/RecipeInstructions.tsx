import { Card, CardContent } from "@/components/ui/card";
import { RecipeData } from "@/hooks/useCoffeeRecipe";
import { List, Clock, Thermometer } from "lucide-react";

interface RecipeInstructionsProps {
  recipeData: RecipeData;
}

export function RecipeInstructions({ recipeData }: RecipeInstructionsProps) {
  const { coffee, nutrition } = recipeData;

  return (
    <>
      <Card className="coffee-card">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
            <List className="mr-3 text-coffee-500" size={24} />
            Brewing Instructions
          </h2>
          <div className="space-y-4">
            {coffee.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-coffee-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-coffee-700">{instruction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="coffee-card text-center">
          <CardContent className="p-4">
            <Clock className="mx-auto mb-2 text-coffee-500" size={24} />
            <h3 className="font-bold text-coffee-800 mb-1">Brew Time</h3>
            <p className="text-coffee-600 font-medium">{coffee.brewTime}</p>
          </CardContent>
        </Card>
        <Card className="coffee-card text-center">
          <CardContent className="p-4">
            <Thermometer className="mx-auto mb-2 text-coffee-500" size={24} />
            <h3 className="font-bold text-coffee-800 mb-1">Temperature</h3>
            <p className="text-coffee-600 font-medium">{coffee.temperature}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="coffee-card">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-coffee-800 mb-4">
            Nutritional Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-coffee-600">{nutrition.calories}</p>
              <p className="text-sm text-coffee-500 font-medium">Calories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-coffee-600">{nutrition.sugar}g</p>
              <p className="text-sm text-coffee-500 font-medium">Sugar</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-coffee-600">{nutrition.caffeine}mg</p>
              <p className="text-sm text-coffee-500 font-medium">Caffeine</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-coffee-600">{nutrition.protein}g</p>
              <p className="text-sm text-coffee-500 font-medium">Protein</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
