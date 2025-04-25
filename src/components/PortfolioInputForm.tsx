
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface Stock {
  symbol: string;
  market: 'TW' | 'US';
}

const PortfolioInputForm: React.FC = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[]>([{ symbol: '', market: 'TW' }]);
  const [totalInvestment, setTotalInvestment] = useState<string>('');

  const addStock = () => {
    setStocks([...stocks, { symbol: '', market: 'TW' }]);
  };

  const removeStock = (index: number) => {
    const newStocks = stocks.filter((_, i) => i !== index);
    setStocks(newStocks);
  };

  const updateStock = (index: number, field: keyof Stock, value: string) => {
    const newStocks = [...stocks];
    newStocks[index] = {
      ...newStocks[index],
      [field]: field === 'market' ? (value as 'TW' | 'US') : value
    };
    setStocks(newStocks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally process the data with an AI model
    // For now, we'll just pass the data to the results page
    navigate('/portfolio/result', {
      state: {
        stocks,
        totalInvestment: parseFloat(totalInvestment)
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

          <Button type="submit" className="w-full">
            取得最佳配置建議
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PortfolioInputForm;
