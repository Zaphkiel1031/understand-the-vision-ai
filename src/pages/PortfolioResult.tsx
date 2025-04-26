
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PieChart, ChartBar, Save, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/stock-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart as RechartsChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
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

interface AnalysisData {
  fundamental: number;
  technical: number;
  chip: number;
  textual: number;
}

const PortfolioResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedToPortfolio, setSavedToPortfolio] = useState(false);

  const { stocks, totalInvestment, riskPreference, timeFrame } = location.state || {
    stocks: [],
    totalInvestment: 0,
    riskPreference: 50,
    timeFrame: '中長期（1-3年）'
  };

  // 風險和收益等級評估
  const riskLevel = getRiskLevel(riskPreference);
  const returnLevel = getReturnLevel(riskPreference);
  
  // 模擬配置 - 這裡可以根據 riskPreference 調整配置
  const allocation = stocks.map((stock: any) => {
    // 根據用戶設定的比例或平均分配
    const percentage = stock.percentage || (100 / stocks.length);
    const amount = (totalInvestment * percentage) / 100;
    
    // 模擬風險和預期回報
    const riskFactor = (riskPreference / 100) * 10;
    const returnFactor = (riskPreference / 100) * 15;
    
    return {
      ...stock,
      allocation: percentage,
      amount: amount,
      percentage: percentage,
      risk: Math.round(riskFactor * (0.8 + Math.random() * 0.4)),
      return: Math.round(returnFactor * (0.9 + Math.random() * 0.6))
    };
  });
  
  // 模擬投資走勢數據
  const trendData = generateTrendData();
  
  // 模擬分析數據 - 基本面、技術面、籌碼面、文本面
  const analysisData: AnalysisData[] = allocation.map((stock: StockAllocation) => ({
    fundamental: Math.round(25 + Math.random() * 30),
    technical: Math.round(15 + Math.random() * 30),
    chip: Math.round(15 + Math.random() * 25),
    textual: Math.round(10 + Math.random() * 20),
  }));
  
  // 計算分析數據平均
  const averageAnalysis = {
    fundamental: Math.round(analysisData.reduce((sum, data) => sum + data.fundamental, 0) / analysisData.length),
    technical: Math.round(analysisData.reduce((sum, data) => sum + data.technical, 0) / analysisData.length),
    chip: Math.round(analysisData.reduce((sum, data) => sum + data.chip, 0) / analysisData.length),
    textual: Math.round(analysisData.reduce((sum, data) => sum + data.textual, 0) / analysisData.length),
  };
  
  const analysisChartData = [
    { name: "基本面", value: averageAnalysis.fundamental },
    { name: "技術面", value: averageAnalysis.technical },
    { name: "籌碼面", value: averageAnalysis.chip },
    { name: "文本面", value: averageAnalysis.textual },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const savePortfolio = () => {
    // 這裡未來可以實現保存到數據庫的功能
    toast.success("投資組合已保存！");
    setSavedToPortfolio(true);
  };

  const startSimulation = () => {
    // 這裡未來可以跳轉到模擬系統的頁面
    toast.info("模擬系統功能即將上線...");
  };

  return (
    <div className="pb-16 max-w-lg mx-auto">
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
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">風險等級</p>
                <p className="text-lg font-medium">{riskLevel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">預期收益</p>
                <p className="text-lg font-medium">{returnLevel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="allocation">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="allocation">配置</TabsTrigger>
            <TabsTrigger value="analysis">分析</TabsTrigger>
            <TabsTrigger value="trend">走勢</TabsTrigger>
            <TabsTrigger value="stocks">個股</TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocation">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>建議配置</CardTitle>
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <ChartContainer config={{}} className="h-64 w-64">
                    <PieChart>
                      <Pie
                        data={allocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="allocation"
                        nameKey="symbol"
                        label={(entry) => `${entry.symbol} ${entry.allocation.toFixed(0)}%`}
                      >
                        {allocation.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
                
                <div className="space-y-4">
                  {allocation.map((stock: StockAllocation, index: number) => (
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
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>投資分析</CardTitle>
                  <ChartBar className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">投資期限：{timeFrame}</p>
                
                <ChartContainer config={{}} className="h-64">
                  <BarChart data={analysisChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="占比">
                      {analysisChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span>基本面分析</span>
                    <span className="font-medium">{averageAnalysis.fundamental}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>技術面分析</span>
                    <span className="font-medium">{averageAnalysis.technical}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>籌碼面分析</span>
                    <span className="font-medium">{averageAnalysis.chip}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>文本面分析</span>
                    <span className="font-medium">{averageAnalysis.textual}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trend">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>預估走勢</CardTitle>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="portfolio" name="投資組合" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="benchmark" name="大盤指數" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>* 此走勢圖為預估數據，僅供參考</p>
                  <p>* 實際收益將受市場因素影響</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stocks">
            <Card>
              <CardHeader>
                <CardTitle>個股表現</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allocation.map((stock: StockAllocation, index: number) => (
                    <div key={index} className="pb-4 border-b last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{stock.symbol}</h3>
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          {stock.market === 'TW' ? '台股' : '美股'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">風險指數</p>
                          <p className="text-lg font-medium">{stock.risk}/10</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">預期年化收益</p>
                          <p className="text-lg font-medium">{stock.return}%</p>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p className="mb-1">投資金額：{formatCurrency(stock.amount, 'TWD')}</p>
                        <p>佔比：{formatPercentage(stock.percentage)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={savePortfolio}
            disabled={savedToPortfolio}
          >
            <Save className="mr-2 h-4 w-4" />
            {savedToPortfolio ? "已儲存" : "儲存組合"}
          </Button>
          <Button 
            className="w-full"
            onClick={startSimulation}
          >
            開始模擬
          </Button>
        </div>
      </main>
    </div>
  );
};

// 根據風險偏好評估風險等級
function getRiskLevel(riskPreference: number): string {
  if (riskPreference < 30) return "低風險";
  if (riskPreference < 70) return "中等風險";
  return "高風險";
}

// 根據風險偏好評估預期收益等級
function getReturnLevel(riskPreference: number): string {
  if (riskPreference < 30) return "低收益 (3-6%)";
  if (riskPreference < 70) return "中等收益 (6-12%)";
  return "高收益 (12%+)";
}

// 產生模擬走勢數據
function generateTrendData() {
  const data = [];
  let portfolioValue = 100;
  let benchmarkValue = 100;
  
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  for (let i = 0; i < 12; i++) {
    // 投資組合表現略優於大盤
    portfolioValue = portfolioValue * (1 + (Math.random() * 0.04 - 0.01));
    benchmarkValue = benchmarkValue * (1 + (Math.random() * 0.035 - 0.015));
    
    data.push({
      month: months[i],
      portfolio: parseFloat(portfolioValue.toFixed(2)),
      benchmark: parseFloat(benchmarkValue.toFixed(2)),
    });
  }
  
  return data;
}

export default PortfolioResult;

