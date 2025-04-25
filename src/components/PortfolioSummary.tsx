
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockPortfolio } from "@/lib/stock-utils";
import { useNavigate } from "react-router-dom";

const PortfolioSummary: React.FC = () => {
  const navigate = useNavigate();
  const portfolioGainClass = getPriceChangeClass(mockPortfolio.percentReturn);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">我的投資組合</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-2xl font-bold">
            {formatCurrency(mockPortfolio.totalValue)}
          </p>
          <p className={`${portfolioGainClass}`}>
            {formatCurrency(mockPortfolio.totalReturn)} ({formatPercentage(mockPortfolio.percentReturn)})
          </p>
        </div>
        
        <div className="space-y-3">
          {mockPortfolio.stocks.map((stock) => (
            <div 
              key={stock.id} 
              className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer"
              onClick={() => navigate(`/stock/${stock.id}`)}
            >
              <div>
                <p className="font-medium">{stock.symbol}</p>
                <p className="text-sm text-muted-foreground">{stock.shares} 股</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(stock.value)}</p>
                <p className={`text-sm ${getPriceChangeClass(stock.percentGain)}`}>
                  {formatPercentage(stock.percentGain)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => navigate('/portfolio')}
        >
          查看全部
        </button>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
