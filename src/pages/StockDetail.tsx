
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockStocks } from "@/lib/stock-utils";
import StockChart from "@/components/StockChart";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";

const StockDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the stock by id
  const stock = mockStocks.find(s => s.id === id);
  
  if (!stock) {
    return (
      <div className="p-4 text-center">
        <p>找不到股票信息</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-md"
        >
          返回首頁
        </button>
      </div>
    );
  }
  
  const priceChangeClass = getPriceChangeClass(stock.priceChange);
  const isPriceUp = stock.priceChange >= 0;
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-1 rounded-full hover:bg-muted"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{stock.symbol}</h1>
          <p className="text-sm text-muted-foreground">{stock.name}</p>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Price and Chart */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-3xl font-bold">{formatCurrency(stock.price)}</p>
                <p className={`text-lg ${priceChangeClass}`}>
                  {formatCurrency(stock.priceChange)} ({formatPercentage(stock.percentChange)})
                </p>
              </div>
              
              <div className="h-60">
                <StockChart 
                  data={stock.data} 
                  isPriceUp={isPriceUp}
                  height={240} 
                />
              </div>
            </div>
            
            {/* Stock Info */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">開盤價</p>
                <p className="font-medium">{formatCurrency(stock.price - 1.2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">最高價</p>
                <p className="font-medium">{formatCurrency(stock.price + 2.5)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">最低價</p>
                <p className="font-medium">{formatCurrency(stock.price - 3.1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">交易量</p>
                <p className="font-medium">{stock.volume.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">市值(億)</p>
                <p className="font-medium">{(stock.price * 50000000 / 100000000).toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">昨收價</p>
                <p className="font-medium">{formatCurrency(stock.price - stock.priceChange)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Buy/Sell Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 bg-stock-up text-white rounded-md font-medium">買入</button>
          <button className="py-3 bg-stock-down text-white rounded-md font-medium">賣出</button>
        </div>
        
        {/* Technical Analysis Button */}
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-md font-medium">
          技術分析
        </button>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default StockDetail;
