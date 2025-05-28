import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Download, FileText } from "lucide-react";

interface ActionButtonsProps {
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  isSaveOnCooldown: boolean;
  isLoading: boolean;
}

export function ActionButtons({ 
  onSave, 
  onLoad, 
  onExport, 
  isSaveOnCooldown, 
  isLoading 
}: ActionButtonsProps) {
  return (
    <Card className="coffee-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onSave}
            disabled={isSaveOnCooldown}
            className="bg-gradient-to-r from-coffee-500 to-coffee-600 hover:from-coffee-600 hover:to-coffee-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="mr-2" size={18} />
            {isSaveOnCooldown ? "Please wait..." : "Save My Favorite"}
          </Button>
          <Button
            onClick={onLoad}
            disabled={isLoading}
            className="bg-gradient-to-r from-coffee-300 to-coffee-400 hover:from-coffee-400 hover:to-coffee-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Download className="mr-2" size={18} />
            {isLoading ? (
              <>
                <div className="loading-spinner mr-2" />
                Loading...
              </>
            ) : (
              "Load Favorite"
            )}
          </Button>
        </div>
        <Button
          onClick={onExport}
          className="w-full mt-4 bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FileText className="mr-2" size={18} />
          Export Recipe to PDF
        </Button>
      </CardContent>
    </Card>
  );
}
