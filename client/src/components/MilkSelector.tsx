import { Card, CardContent } from "@/components/ui/card";
import { milkTypes } from "@/lib/coffeeData";
import { Droplets } from "lucide-react";

interface MilkSelectorProps {
  selectedMilk: string;
  onMilkChange: (milk: string) => void;
}

export function MilkSelector({ selectedMilk, onMilkChange }: MilkSelectorProps) {
  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
          <Droplets className="mr-3 text-coffee-500" size={24} />
          Milk Choice
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {milkTypes.map((milk) => (
            <button
              key={milk.id}
              onClick={() => onMilkChange(milk.id)}
              className={`coffee-option p-4 bg-coffee-50 rounded-xl text-center font-medium border-2 border-transparent hover:border-coffee-300 ${
                selectedMilk === milk.id ? 'selected' : ''
              }`}
            >
              <span className="font-semibold text-coffee-800">{milk.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
