
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/stock-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart as RechartsChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { toast } from "sonner";

interface StockAllocation {
  symbol: string;
  market: 'TW' | 'US';
  allocation: number;
  amount: number;
  percentage: number;
  risk: number;
  return: number;
}

const PortfolioResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedToPortfolio, setSavedToPortfolio] = useState(false);

  const { stocks, totalInvestment, riskPreference } = location.state || {
    stocks: [],
    totalInvestment: 0,
    riskPreference: 50,
  };

  // 生成分配比例
  const allocation = stocks.map((stock: any) => {
    const percentage = stock.percentage || (100 / stocks.length);
    const amount = (totalInvestment * percentage) / 100;
    
    return {
      ...stock,
      allocation: percentage,
      amount: amount,
      percentage: percentage,
      risk: Math.round((riskPreference / 100) * 10 * (0.8 + Math.random() * 0.4)),
      return: Math.round((riskPreference / 100) * 15 * (0.9 + Math.random() * 0.6))
    };
  });
  
  // 走勢數據
  const trendData = generateTrendData();
  
  // 四個面向數據（均等配置25%）
  const COLORS = ['#7BC67B', '#79B4F9', '#FFD066', '#D1D6E6'];

  // 四面向數據
  const analysisChartData = [
    { name: "基本面", value: 25 },
    { name: "技術面", value: 25 },
    { name: "籌碼面", value: 25 },
    { name: "文本面", value: 25 },
  ];
  
  // 個股詳情
  const stockDetails = [
    { id: 1, name: "個股 1" },
    { id: 2, name: "個股 2" },
    { id: 3, name: "個股 3" }
  ];

  const savePortfolio = () => {
    toast.success("投資組合已保存！");
    setSavedToPortfolio(true);
  };

  const startSimulation = () => {
    navigate('/portfolio/simulation', {
      state: {
        stocks: allocation,
        totalInvestment
      }
    });
  };

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
        {/* 投資組合列表 */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="flex-shrink-0 p-2 min-w-[120px]">
              <p className="text-sm font-medium">投資組合 ({i})</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trend">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="trend">報酬曲線</TabsTrigger>
            <TabsTrigger value="risk">風險曲線</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trend" className="mt-0">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48">
                  <ChartContainer config={{}} className="h-full w-full">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{fontSize: 10}} />
                      <YAxis tick={{fontSize: 10}} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="投資組合" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        name="大盤指數" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-0">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-48">
                  <ChartContainer config={{}} className="h-full w-full">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{fontSize: 10}} />
                      <YAxis tick={{fontSize: 10}} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="risk" 
                        name="風險曲線" 
                        stroke="#ff7300" 
                        strokeWidth={2} 
                        dot={false} 
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 四面向分析 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">四面向</h2>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="relative w-40 h-40">
              <ChartContainer config={{}} className="h-full w-full">
                <RechartsChart>
                  <Pie
                    data={analysisChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {analysisChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-sm font-bold">
                    25
                  </text>
                </RechartsChart>
              </ChartContainer>
              
              {/* 標籤 */}
              <div className="absolute top-2 right-0 text-xs">
                <span className="inline-block w-3 h-3 rounded-full bg-[#D1D6E6] mr-1"></span>
                <span>文本面</span>
              </div>
              <div className="absolute top-2 left-0 text-xs">
                <span className="inline-block w-3 h-3 rounded-full bg-[#7BC67B] mr-1"></span>
                <span>基本面</span>
              </div>
              <div className="absolute bottom-2 right-0 text-xs">
                <span className="inline-block w-3 h-3 rounded-full bg-[#79B4F9] mr-1"></span>
                <span>技術面</span>
              </div>
              <div className="absolute bottom-2 left-0 text-xs">
                <span className="inline-block w-3 h-3 rounded-full bg-[#FFD066] mr-1"></span>
                <span>籌碼面</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 個股列表 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {stockDetails.map((stock) => (
            <Card key={stock.id} className="flex-shrink-0 p-2 min-w-[100px]">
              <p className="text-xs font-medium text-center">{stock.name}</p>
            </Card>
          ))}
        </div>
        
        {/* 四面向按鈕 */}
        <div className="grid grid-cols-4 gap-2">
          <Card className="p-2 flex flex-col items-center">
            <p className="text-xs mb-1">基本面</p>
            <div className="text-2xl">🙂</div>
          </Card>
          <Card className="p-2 flex flex-col items-center">
            <p className="text-xs mb-1">技術面</p>
            <div className="text-2xl">🙂</div>
          </Card>
          <Card className="p-2 flex flex-col items-center">
            <p className="text-xs mb-1">籌碼面</p>
            <div className="text-2xl">😐</div>
          </Card>
          <Card className="p-2 flex flex-col items-center">
            <p className="text-xs mb-1">文本面</p>
            <div className="text-2xl">🙂</div>
          </Card>
        </div>
        
        {/* 操作按鈕 */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="destructive" 
            className="w-full"
          >
            丟棄此組合
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={savePortfolio}
            disabled={savedToPortfolio}
          >
            <Save className="mr-2 h-4 w-4" />
            保存此組合
          </Button>
          <Button 
            className="w-full"
            onClick={startSimulation}
          >
            開始組合模擬
          </Button>
        </div>
      </main>
    </div>
  );
};

function generateTrendData() {
  const data = [];
  let portfolioValue = 100;
  let benchmarkValue = 100;
  let riskValue = 30;
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  for (let i = 0; i < 12; i++) {
    portfolioValue = portfolioValue * (1 + (Math.random() * 0.04 - 0.01));
    benchmarkValue = benchmarkValue * (1 + (Math.random() * 0.035 - 0.015));
    riskValue = riskValue * (1 + (Math.random() * 0.02 - 0.01));
    
    data.push({
      month: months[i],
      portfolio: parseFloat(portfolioValue.toFixed(2)),
      benchmark: parseFloat(benchmarkValue.toFixed(2)),
      risk: parseFloat(riskValue.toFixed(2)),
    });
  }
  
  return data;
}

export default PortfolioResult;
