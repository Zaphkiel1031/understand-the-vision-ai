
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockPortfolio } from "@/lib/stock-utils";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioForm from "@/components/PortfolioForm";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("summary");
  const portfolioGainClass = getPriceChangeClass(mockPortfolio.percentReturn);
  
  const handleAddStock = (stock: { symbol: string; shares: number; price: number }) => {
    console.log("Adding stock:", stock);
    // In a real app, you would add the stock to the portfolio
    // and update the state
  };
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-1 rounded-full hover:bg-muted"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">投資組合</h1>
        </div>
        <button 
          onClick={() => {}}
          className="p-1 rounded-full hover:bg-muted"
        >
          <Plus size={20} />
        </button>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Portfolio Value Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-2">總資產</h2>
            <p className="text-3xl font-bold mb-1">
              {formatCurrency(mockPortfolio.totalValue)}
            </p>
            <p className={`${portfolioGainClass}`}>
              {formatCurrency(mockPortfolio.totalReturn)} ({formatPercentage(mockPortfolio.percentReturn)})
            </p>
          </CardContent>
        </Card>
        
        {/* Portfolio Tabs */}
        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="summary">總覽</TabsTrigger>
            <TabsTrigger value="stocks">個股</TabsTrigger>
            <TabsTrigger value="analysis">分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            {/* Performance Chart Placeholder */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">資產配置</h3>
                <div className="bg-muted h-40 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">資產配置圖表</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">總投資</p>
                  <p className="text-lg font-bold">{formatCurrency(mockPortfolio.totalValue - mockPortfolio.totalReturn)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">總收益</p>
                  <p className={`text-lg font-bold ${portfolioGainClass}`}>{formatCurrency(mockPortfolio.totalReturn)}</p>
                </CardContent>
              </Card>
            </div>
            
            <PortfolioForm onAddStock={handleAddStock} />
          </TabsContent>
          
          <TabsContent value="stocks">
            <div className="space-y-4">
              {mockPortfolio.stocks.map((stock) => (
                <Card key={stock.id} onClick={() => navigate(`/stock/${stock.id}`)}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{stock.symbol}</p>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(stock.value)}</p>
                        <p className={`text-sm ${getPriceChangeClass(stock.percentGain)}`}>
                          {formatPercentage(stock.percentGain)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">持有</p>
                        <p>{stock.shares} 股</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">成本</p>
                        <p>{formatCurrency(stock.costBasis)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">現價</p>
                        <p>{formatCurrency(stock.currentPrice)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <PortfolioForm onAddStock={handleAddStock} />
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">投資分析</h3>
                <div className="space-y-6">
                  <div className="bg-muted h-40 rounded-md flex items-center justify-center mb-4">
                    <p className="text-muted-foreground">行業分佈圖表</p>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">行業分佈</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>半導體</span>
                        <span>45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>科技</span>
                        <span>25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>金融</span>
                        <span>15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>其他</span>
                        <span>15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Portfolio;
