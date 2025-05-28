import { Card, CardContent } from "@/components/ui/card";
import { RecipeData } from "@/hooks/useCoffeeRecipe";
import { Eye } from "lucide-react";

interface CoffeePreviewProps {
  recipeData: RecipeData;
}

export function CoffeePreview({ recipeData }: CoffeePreviewProps) {
  const { coffee, milk } = recipeData;

  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
          <Eye className="mr-3 text-coffee-500" size={24} />
          Your Coffee Preview
        </h2>
        <div className="text-center space-y-4">
          <div className="coffee-steam inline-block">
            <img
              src={coffee.image}
              alt={`${coffee.name} with ${milk.name}`}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold gradient-text">
            {coffee.name} with {milk.name}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
