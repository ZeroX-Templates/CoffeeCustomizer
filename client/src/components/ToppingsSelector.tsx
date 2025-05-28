import { Card, CardContent } from "@/components/ui/card";
import { toppingTypes } from "@/lib/coffeeData";
import { Star, Cookie, Cloud, X } from "lucide-react";

interface ToppingsSelectorProps {
  selectedTopping: string;
  onToppingChange: (topping: string) => void;
}

const toppingIcons = {
  cinnamon: Star,
  cocoa: Cookie,
  whipped: Cloud,
  none: X
};

export function ToppingsSelector({ selectedTopping, onToppingChange }: ToppingsSelectorProps) {
  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-coffee-800 mb-4 flex items-center">
          <Star className="mr-3 text-coffee-500" size={24} />
          Toppings
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {toppingTypes.map((topping) => {
            const IconComponent = toppingIcons[topping.id as keyof typeof toppingIcons];
            return (
              <button
                key={topping.id}
                onClick={() => onToppingChange(topping.id)}
                className={`coffee-option p-4 bg-coffee-50 rounded-xl text-center font-medium border-2 border-transparent hover:border-coffee-300 ${
                  selectedTopping === topping.id ? 'selected' : ''
                }`}
              >
                <IconComponent className="mx-auto mb-2 text-coffee-500" size={20} />
                <span className="font-semibold text-coffee-800">{topping.name}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
