import { Card, CardContent } from "@/components/ui/card";
import { RecipeData } from "@/hooks/useCoffeeRecipe";
import { List, Clock, Thermometer } from "lucide-react";

interface RecipeInstructionsProps {
  recipeData: RecipeData;
}

export function RecipeInstructions({ recipeData }: RecipeInstructionsProps) {
  const { coffee, nutrition, advancedMetrics } = recipeData;

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
            Complete Nutritional Analysis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
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
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center border-t border-coffee-200 pt-4">
            <div>
              <p className="text-lg font-bold text-coffee-600">{nutrition.fat}g</p>
              <p className="text-xs text-coffee-500 font-medium">Fat</p>
            </div>
            <div>
              <p className="text-lg font-bold text-coffee-600">{nutrition.carbs}g</p>
              <p className="text-xs text-coffee-500 font-medium">Carbs</p>
            </div>
            <div>
              <p className="text-lg font-bold text-coffee-600">{nutrition.fiber}g</p>
              <p className="text-xs text-coffee-500 font-medium">Fiber</p>
            </div>
            <div>
              <p className="text-lg font-bold text-coffee-600">{nutrition.sodium}mg</p>
              <p className="text-xs text-coffee-500 font-medium">Sodium</p>
            </div>
            <div>
              <p className="text-lg font-bold text-coffee-600">{nutrition.antioxidants}</p>
              <p className="text-xs text-coffee-500 font-medium">Antioxidants</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="coffee-card">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-coffee-800 mb-4">
            Advanced Metrics & Health Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Health Score</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-16 h-2 rounded-full ${
                    advancedMetrics.healthScore >= 80 ? 'bg-green-500' :
                    advancedMetrics.healthScore >= 60 ? 'bg-yellow-500' :
                    advancedMetrics.healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                  <span className="font-bold text-coffee-800">{advancedMetrics.healthScore}/100</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Sugar Intensity</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  advancedMetrics.sugarIntensity === 'Low' ? 'bg-green-100 text-green-800' :
                  advancedMetrics.sugarIntensity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  advancedMetrics.sugarIntensity === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {advancedMetrics.sugarIntensity}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Energy Profile</span>
                <span className="font-bold text-coffee-800">{advancedMetrics.energyProfile}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Caffeine/oz</span>
                <span className="font-bold text-coffee-800">{advancedMetrics.caffeinePerOz}mg</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Protein Quality</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  advancedMetrics.proteinQuality === 'Complete' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {advancedMetrics.proteinQuality}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Glycemic Impact</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  advancedMetrics.glycemicImpact === 'Low' ? 'bg-green-100 text-green-800' :
                  advancedMetrics.glycemicImpact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {advancedMetrics.glycemicImpact}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-coffee-50 rounded-lg">
                <span className="font-medium text-coffee-700">Calories from Fat</span>
                <span className="font-bold text-coffee-800">{advancedMetrics.caloriesFromFat}</span>
              </div>
              
              <div className="p-3 bg-coffee-50 rounded-lg text-center">
                <p className="text-xs text-coffee-600 mb-1">Recommended serving size: 12oz</p>
                <p className="text-xs text-coffee-600">Best enjoyed within 15 minutes of brewing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
