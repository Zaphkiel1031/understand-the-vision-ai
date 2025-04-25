
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockMarketIndexes } from "@/lib/stock-utils";
import { useNavigate } from "react-router-dom";

const MarketOverview: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">市場指數</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockMarketIndexes.map((index) => (
            <div 
              key={index.id} 
              className="flex justify-between items-center py-2 border-b last:border-b-0"
              onClick={() => navigate(`/market/${index.id}`)}
            >
              <div>
                <p className="font-medium">{index.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(index.value, '')}</p>
                <p className={`text-sm ${getPriceChangeClass(index.change)}`}>
                  {formatCurrency(index.change, '')} ({formatPercentage(index.percentChange)})
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
