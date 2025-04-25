
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/stock-utils";

const PortfolioResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stocks, totalInvestment } = location.state || {
    stocks: [],
    totalInvestment: 0
  };

  // This is a mock allocation - in reality, this would come from your AI model
  const mockAllocation = stocks.map((stock: any) => ({
    ...stock,
    allocation: (100 / stocks.length),
    amount: totalInvestment / stocks.length
  }));

  return (
    <div className="pb-16 max-w-md mx-auto">
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-1 rounded-full hover:bg-muted"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">投資組合建議</h1>
      </header>

      <main className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>投資總額</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(totalInvestment, 'TWD')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>建議配置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAllocation.map((stock: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.market === 'TW' ? '台股' : '美股'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(stock.amount, 'TWD')}</p>
                    <p className="text-sm text-muted-foreground">{formatPercentage(stock.allocation)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PortfolioResult;
