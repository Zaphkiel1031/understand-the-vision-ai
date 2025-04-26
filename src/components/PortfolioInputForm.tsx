
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Stock {
  symbol: string;
  market: 'TW' | 'US';
  percentage?: number;
}

const PortfolioInputForm: React.FC = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[]>([{ symbol: '', market: 'TW' }]);
  const [totalInvestment, setTotalInvestment] = useState<string>('');
  const [riskPreference, setRiskPreference] = useState<number>(50);
  const [isCustomAllocation, setIsCustomAllocation] = useState<boolean>(false);
  
  const addStock = () => {
    setStocks([...stocks, { symbol: '', market: 'TW' }]);
  };

  const removeStock = (index: number) => {
    const newStocks = stocks.filter((_, i) => i !== index);
    setStocks(newStocks);
  };

  const updateStock = (index: number, field: keyof Stock, value: string | number) => {
    const newStocks = [...stocks];
    if (field === 'market') {
      newStocks[index] = {
        ...newStocks[index],
        [field]: value as 'TW' | 'US'
      };
    } else if (field === 'percentage') {
      newStocks[index] = {
        ...newStocks[index],
        [field]: Number(value)
      };
    } else {
      newStocks[index] = {
        ...newStocks[index],
        [field]: value as string
      };
    }
    setStocks(newStocks);
  };
  
  const calculateRemainingPercentage = () => {
    const total = stocks.reduce((sum, stock) => sum + (stock.percentage || 0), 0);
    return 100 - total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If custom allocation is not enabled, distribute evenly
    let stocksWithAllocation = [...stocks];
    if (!isCustomAllocation) {
      const evenPercentage = 100 / stocks.length;
      stocksWithAllocation = stocks.map(stock => ({
        ...stock,
        percentage: evenPercentage
      }));
    }
    
    // Here we would normally process the data with an AI model
    navigate('/portfolio/result', {
      state: {
        stocks: stocksWithAllocation,
        totalInvestment: parseFloat(totalInvestment),
        riskPreference,
        timeFrame: '中長期（1-3年）' // 預設值
      }
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>投資標的</Label>
            {stocks.map((stock, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <select
                      className="border rounded px-3 py-2 bg-background"
                      value={stock.market}
                      onChange={(e) => updateStock(index, 'market', e.target.value)}
                    >
                      <option value="TW">台股</option>
                      <option value="US">美股</option>
                    </select>
                    <Input
                      placeholder="請輸入股票代碼"
                      value={stock.symbol}
                      onChange={(e) => updateStock(index, 'symbol', e.target.value)}
                      required
                    />
                  </div>
                  
                  {isCustomAllocation && (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={stock.percentage || ''}
                        onChange={(e) => updateStock(index, 'percentage', e.target.value)}
                        className="w-20"
                      />
                      <span>%</span>
                    </div>
                  )}
                </div>
                {stocks.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStock(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addStock}
            >
              <Plus className="mr-2 h-4 w-4" />
              新增標的
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalInvestment">投資總額 (TWD)</Label>
            <Input
              id="totalInvestment"
              type="number"
              min="0"
              step="1000"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(e.target.value)}
              placeholder="請輸入投資總額"
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label>風險偏好</Label>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>保守型</span>
              <span>平衡型</span>
              <span>積極型</span>
            </div>
            <Slider
              value={[riskPreference]}
              min={0}
              max={100}
              step={10}
              onValueChange={(value) => setRiskPreference(value[0])}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="customAllocation"
              checked={isCustomAllocation}
              onChange={(e) => setIsCustomAllocation(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="customAllocation">自訂投資比例</Label>
          </div>
          
          {isCustomAllocation && (
            <div className="text-sm text-muted-foreground">
              剩餘比例：{calculateRemainingPercentage()}%
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isCustomAllocation && calculateRemainingPercentage() !== 0}
          >
            取得最佳配置建議
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PortfolioInputForm;

