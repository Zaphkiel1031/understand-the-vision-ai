
import React from "react";
import { useNavigate } from "react-router-dom";
import MarketOverview from "@/components/MarketOverview";
import Navigation from "@/components/Navigation";
import { mockStocks, mockMarketIndexes } from "@/lib/stock-utils";
import StockCard from "@/components/StockCard";
import StockNews from "@/components/StockNews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  
  // 熱門股票
  const hotStocks = mockStocks.slice(0, 3);
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* 頂部搜索與導航 */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">👤</span>
          </div>
          
          <div className="relative flex-1 mx-4">
            <div className="flex items-center border rounded-full px-3 py-1 bg-muted/50">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="搜尋股票代號/名稱" 
                className="bg-transparent border-none outline-none text-sm w-full" 
                onClick={() => navigate('/search')}
              />
            </div>
          </div>
          
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-muted-foreground">🔔</span>
          </div>
        </div>
        
        {/* 台股/美股 標籤 */}
        <Tabs defaultValue="tw" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="tw">台股</TabsTrigger>
            <TabsTrigger value="us">美股</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      <main className="p-4 space-y-6">
        {/* 大盤指數卡片 */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3">
            <p className="text-sm text-muted-foreground mb-1">加權指數</p>
            <p className={`text-xl font-bold ${mockMarketIndexes[0].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {mockMarketIndexes[0].value.toLocaleString()}
            </p>
            <div className={`text-xs ${mockMarketIndexes[0].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {mockMarketIndexes[0].change > 0 ? '▲' : '▼'} {Math.abs(mockMarketIndexes[0].change).toFixed(2)} ({Math.abs(mockMarketIndexes[0].percentChange).toFixed(2)}%)
            </div>
          </Card>
          
          <Card className="p-3">
            <p className="text-sm text-muted-foreground mb-1">電子指數</p>
            <p className={`text-xl font-bold ${mockMarketIndexes[1].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {mockMarketIndexes[1].value.toLocaleString()}
            </p>
            <div className={`text-xs ${mockMarketIndexes[1].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {mockMarketIndexes[1].change > 0 ? '▲' : '▼'} {Math.abs(mockMarketIndexes[1].change).toFixed(2)} ({Math.abs(mockMarketIndexes[1].percentChange).toFixed(2)}%)
            </div>
          </Card>
        </div>
        
        {/* 走勢圖 */}
        <Card className="p-3">
          <div className="h-40 w-full">
            <img 
              src="/lovable-uploads/180a042e-1f49-4323-98b9-c842dcdd559f.png" 
              alt="走勢圖" 
              className="h-full w-full object-contain"
              style={{objectPosition: '0 33%'}}
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
          </div>
        </Card>
        
        {/* 產業指數 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm mb-1">上櫃</p>
            <p className={`text-lg font-bold ${mockMarketIndexes[2].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              251.77
            </p>
            <p className={`text-xs ${mockMarketIndexes[2].change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              ▼ 168.16
            </p>
          </div>
          
          <div>
            <p className="text-sm mb-1">電子</p>
            <p className={`text-lg font-bold text-red-500`}>
              1,209.10
            </p>
            <p className="text-xs text-red-500">
              ▲ 168.16
            </p>
          </div>
          
          <div>
            <p className="text-sm mb-1">金融</p>
            <p className={`text-lg font-bold text-green-500`}>
              2,209.10
            </p>
            <p className="text-xs text-green-500">
              ▼ 168.16
            </p>
          </div>
        </div>
        
        {/* 股票列表 */}
        <div>
          <p className="text-sm font-medium mb-2">台股熱門排行</p>
          <div className="border-t border-border">
            <div className="flex justify-between text-xs py-2 border-b border-border">
              <div className="w-1/5 text-center font-medium">代號</div>
              <div className="w-1/4 font-medium">名稱</div>
              <div className="w-1/4 text-right font-medium">成交價</div>
              <div className="w-1/4 text-right font-medium">漲跌</div>
            </div>
            
            {hotStocks.map((stock, index) => (
              <div 
                key={stock.id} 
                className="flex justify-between items-center py-3 border-b border-border text-sm"
                onClick={() => navigate(`/stock/${stock.id}`)}
              >
                <div className="w-1/5 text-center">
                  <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">
                    {stock.id.slice(-4)}
                  </span>
                </div>
                <div className="w-1/4">{stock.name}</div>
                <div className="w-1/4 text-right font-medium">
                  {stock.price.toFixed(2)}
                </div>
                <div className={`w-1/4 text-right ${stock.priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.priceChange > 0 ? '▲' : '▼'} {Math.abs(stock.priceChange).toFixed(2)}%
                  <button className="ml-2 bg-muted rounded-full w-6 h-6 flex items-center justify-center text-primary">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 股市新聞 */}
        <StockNews />
      </main>

      {/* 底部導航 */}
      <Navigation />
    </div>
  );
};

export default Index;
