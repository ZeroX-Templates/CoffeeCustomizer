import { useCoffeeRecipe } from "@/hooks/useCoffeeRecipe";
import { CoffeeTypeSelector } from "@/components/CoffeeTypeSelector";
import { MilkSelector } from "@/components/MilkSelector";
import { SugarSlider } from "@/components/SugarSlider";
import { ToppingsSelector } from "@/components/ToppingsSelector";
import { CoffeePreview } from "@/components/CoffeePreview";
import { RecipeInstructions } from "@/components/RecipeInstructions";
import { ActionButtons } from "@/components/ActionButtons";
import { LoadingModal } from "@/components/LoadingModal";
import { Coffee } from "lucide-react";

export default function CoffeeCustomizer() {
  const {
    recipe,
    recipeData,
    isLoading,
    isSaveOnCooldown,
    updateCoffeeType,
    updateMilkType,
    updateSugarLevel,
    updateToppings,
    saveFavorite,
    loadFavorite,
    exportRecipe
  } = useCoffeeRecipe();

  return (
    <div className="min-h-screen coffee-gradient-bg">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            <Coffee className="inline-block mr-3" size={48} />
            Coffee Customizer
          </h1>
          <p className="text-coffee-700 text-lg md:text-xl font-medium">
            Craft your perfect cup, one choice at a time
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className="space-y-6">
            <CoffeeTypeSelector
              selectedType={recipe.coffeeType}
              onTypeChange={updateCoffeeType}
            />
            
            <MilkSelector
              selectedMilk={recipe.milkType}
              onMilkChange={updateMilkType}
            />
            
            <SugarSlider
              sugarLevel={recipe.sugarLevel}
              onSugarChange={updateSugarLevel}
            />
            
            <ToppingsSelector
              selectedTopping={recipe.toppings[0]}
              onToppingChange={updateToppings}
            />
            
            <ActionButtons
              onSave={saveFavorite}
              onLoad={loadFavorite}
              onExport={exportRecipe}
              isSaveOnCooldown={isSaveOnCooldown}
              isLoading={isLoading}
            />
          </div>

          {/* Recipe Display */}
          <div className="space-y-6">
            <CoffeePreview recipeData={recipeData} />
            <RecipeInstructions recipeData={recipeData} />
          </div>
        </div>
      </main>

      <LoadingModal isOpen={isLoading} />
    </div>
  );
}
