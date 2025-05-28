import { Card, CardContent } from "@/components/ui/card";
import { coffeeTypes } from "@/lib/coffeeData";
import { Coffee } from "lucide-react";

interface CoffeeTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function CoffeeTypeSelector({ selectedType, onTypeChange }: CoffeeTypeSelectorProps) {
  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
          <Coffee className="mr-3 text-coffee-500" size={24} />
          Choose Your Coffee
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {coffeeTypes.map((coffee) => (
            <button
              key={coffee.id}
              onClick={() => onTypeChange(coffee.id)}
              className={`coffee-option p-4 bg-coffee-50 rounded-xl text-center font-medium border-2 border-transparent hover:border-coffee-300 ${
                selectedType === coffee.id ? 'selected' : ''
              }`}
            >
              <Coffee className="mx-auto mb-2 text-coffee-500" size={24} />
              <div className="font-semibold text-coffee-800">{coffee.name}</div>
              <div className="text-sm text-coffee-600 mt-1">{coffee.description}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
