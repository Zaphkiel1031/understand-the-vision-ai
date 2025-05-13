
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockPortfolio } from "@/lib/stock-utils";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioInputForm from "@/components/PortfolioInputForm";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("summary");
  const portfolioGainClass = getPriceChangeClass(mockPortfolio.percentReturn);
  
  const handleAddStock = (stock: { symbol: string; shares: number; price: number }) => {
    console.log("Adding stock:", stock);
    // 在真實應用中，你會將股票添加到投資組合並更新狀態
  };

  // 產生資產配置數據
  const assetAllocationData = [
    { name: "科技", value: 45, color: "#4CAF50" },
    { name: "金融", value: 25, color: "#2196F3" },
    { name: "消費", value: 15, color: "#FFC107" },
    { name: "其他", value: 15, color: "#9E9E9E" },
  ];
  
  // 產生走勢圖數據
  const trendData = generateTrendData();
  
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
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="summary">總覽</TabsTrigger>
            <TabsTrigger value="stocks">個股</TabsTrigger>
            <TabsTrigger value="analysis">分析</TabsTrigger>
            <TabsTrigger value="optimize">最佳化</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            {/* Performance Chart */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">資產配置</h3>
                <div className="h-60 relative">
                  <ChartContainer config={{}} className="h-full w-full">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                  
                  {/* Legend */}
                  <div className="absolute top-0 right-0 space-y-2">
                    {assetAllocationData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-xs">{entry.name} {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Portfolio Trend Chart */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">組合走勢</h3>
                <div className="h-40">
                  <ChartContainer config={{}} className="h-full w-full">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{fontSize: 10}}
                        tickFormatter={(value) => value.substring(5)}
                      />
                      <YAxis tick={{fontSize: 10}} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ChartContainer>
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
                  <div className="h-60 flex items-center justify-center">
                    <ChartContainer config={{}} className="h-full w-full">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "基本面", value: 25, color: "#4CAF50" },
                            { name: "技術面", value: 25, color: "#2196F3" },
                            { name: "籌碼面", value: 25, color: "#FFC107" },
                            { name: "文本面", value: 25, color: "#9E9E9E" },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={(entry) => entry.name}
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
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
          
          <TabsContent value="optimize">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">投資組合最佳化</h3>
              <p className="text-sm text-muted-foreground mb-4">
                填寫您的投資目標和風險偏好，獲取專業投資建議
              </p>
              <PortfolioInputForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

// 生成走勢圖數據
function generateTrendData() {
  const data = [];
  let value = 100;
  
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // 產生一個小的隨機波動
    value = value * (1 + (Math.random() * 0.04 - 0.02));
    
    data.push({
      date: dateString,
      value: parseFloat(value.toFixed(2)),
    });
  }
  
  return data;
}

export default Portfolio;
