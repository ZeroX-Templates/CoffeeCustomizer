import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";

interface SugarSliderProps {
  sugarLevel: number;
  onSugarChange: (level: number) => void;
}

export function SugarSlider({ sugarLevel, onSugarChange }: SugarSliderProps) {
  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
          <Sparkles className="mr-3 text-coffee-500" size={24} />
          Sweetness Level
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-coffee-600 font-medium">
            <span>No Sugar</span>
            <span>Very Sweet</span>
          </div>
          <Slider
            value={[sugarLevel]}
            onValueChange={(value) => onSugarChange(value[0])}
            max={5}
            step={1}
            className="w-full"
          />
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-coffee-500 text-white rounded-full font-medium">
              {sugarLevel} teaspoons
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
