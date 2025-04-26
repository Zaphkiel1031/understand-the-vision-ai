
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Clock } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency, formatPercentage, getPriceChangeClass } from "@/lib/stock-utils";
import { toast } from "sonner";

interface SimulationStockData {
  symbol: string;
  market: 'TW' | 'US';
  initialPrice: number;
  currentPrice: number;
  percentage: number;
  amount: number;
  change: number;
  percentageChange: number;
  history: { time: string; price: number; value: number }[];
}

const PortfolioSimulation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationTime, setSimulationTime] = useState<number>(0);
  const [portfolioStocks, setPortfolioStocks] = useState<SimulationStockData[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [initialPortfolioValue, setInitialPortfolioValue] = useState<number>(0);
  const [portfolioHistory, setPortfolioHistory] = useState<{ time: string; value: number }[]>([]);
  
  // 從上一個頁面獲取股票配置
  useEffect(() => {
    if (!location.state?.stocks) {
      toast.error("沒有找到投資組合數據");
      navigate("/portfolio");
      return;
    }
    
    const { stocks, totalInvestment } = location.state;
    
    // 初始化股票數據
    const initialStocks = stocks.map((stock: any) => {
      // 初始隨機價格
      const initialPrice = Math.random() * 100 + 50;
      const amount = (totalInvestment * stock.percentage) / 100;
      
      return {
        symbol: stock.symbol,
        market: stock.market,
        initialPrice,
        currentPrice: initialPrice,
        percentage: stock.percentage,
        amount,
        change: 0,
        percentageChange: 0,
        history: [
          { 
            time: new Date().toLocaleTimeString(), 
            price: initialPrice,
            value: amount
          }
        ]
      };
    });
    
    setPortfolioStocks(initialStocks);
    
    // 計算總價值
    const totalValue = initialStocks.reduce((sum, stock) => sum + stock.amount, 0);
    setPortfolioValue(totalValue);
    setInitialPortfolioValue(totalValue);
    
    // 初始歷史記錄點
    setPortfolioHistory([
      { 
        time: new Date().toLocaleTimeString(),
        value: totalValue
      }
    ]);
  }, [location.state, navigate]);
  
  // 模擬即時更新
  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      // 更新時間
      setSimulationTime(prev => prev + 1);
      
      // 更新股票價格
      setPortfolioStocks(prevStocks => {
        const newStocks = prevStocks.map(stock => {
          // 模擬價格變化 (-2% 到 +2%)
          const changePercent = (Math.random() * 4 - 2) * 0.01;
          const newPrice = stock.currentPrice * (1 + changePercent);
          const newValue = (newPrice / stock.initialPrice) * stock.amount;
          const change = newValue - stock.amount;
          const percentageChange = (change / stock.amount) * 100;
          
          // 新增歷史記錄點
          const newHistory = [...stock.history];
          if (newHistory.length > 20) {
            newHistory.shift(); // 保持有限長度
          }
          
          newHistory.push({ 
            time: new Date().toLocaleTimeString(), 
            price: newPrice,
            value: newValue
          });
          
          return {
            ...stock,
            currentPrice: newPrice,
            change,
            percentageChange,
            history: newHistory
          };
        });
        
        return newStocks;
      });
      
      // 計算更新後的總價值
      setPortfolioValue(prevValue => {
        const newValue = portfolioStocks.reduce(
          (sum, stock) => sum + ((stock.currentPrice / stock.initialPrice) * stock.amount), 
          0
        );
        
        // 新增歷史記錄點
        setPortfolioHistory(prev => {
          const newHistory = [...prev];
          if (newHistory.length > 20) {
            newHistory.shift(); // 保持有限長度
          }
          
          newHistory.push({ 
            time: new Date().toLocaleTimeString(),
            value: newValue
          });
          
          return newHistory;
        });
        
        return newValue;
      });
      
    }, 3000); // 每3秒更新一次
    
    return () => clearInterval(interval);
  }, [isSimulating, portfolioStocks]);
  
  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    if (isSimulating) {
      toast.info("模擬暫停");
    } else {
      toast.success("模擬繼續");
    }
  };
  
  // 計算總收益和百分比
  const totalChange = portfolioValue - initialPortfolioValue;
  const totalPercentChange = (totalChange / initialPortfolioValue) * 100;
  const changeClass = getPriceChangeClass(totalPercentChange);
  
  return (
    <div className="pb-16 max-w-lg mx-auto">
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-1 rounded-full hover:bg-muted"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">投資組合模擬</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>{Math.floor(simulationTime / 60)}:{(simulationTime % 60).toString().padStart(2, '0')}</span>
          <Button 
            size="sm" 
            variant={isSimulating ? "destructive" : "default"}
            onClick={toggleSimulation}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSimulating ? "animate-spin" : ""}`} />
            {isSimulating ? "暫停" : "繼續"}
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>投資組合價值</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(portfolioValue, 'TWD')}</p>
            <p className={changeClass}>
              {formatCurrency(totalChange, 'TWD')} ({formatPercentage(totalPercentChange)})
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>組合走勢</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{}} className="h-full">
                <LineChart data={portfolioHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tick={{fontSize: 10}}
                    interval={Math.ceil(portfolioHistory.length / 5) - 1}
                  />
                  <YAxis 
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                    tick={{fontSize: 10}}
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatCurrency(value, 'TWD')]}
                    labelFormatter={(label: any) => `時間: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="投資組合價值" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <h2 className="font-bold text-lg">個股表現</h2>
          {portfolioStocks.map((stock, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {stock.market === 'TW' ? '台股' : '美股'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(stock.currentPrice * (stock.amount / stock.initialPrice), 'TWD')}</p>
                    <p className={getPriceChangeClass(stock.percentageChange)}>
                      {formatPercentage(stock.percentageChange)}
                    </p>
                  </div>
                </div>
                
                <div className="h-32">
                  <ChartContainer config={{}} className="h-full">
                    <LineChart data={stock.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tick={{fontSize: 8}}
                        interval={Math.ceil(stock.history.length / 3) - 1}
                      />
                      <YAxis 
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tick={{fontSize: 8}}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`${value.toFixed(2)}`, '價格']}
                        labelFormatter={(label: any) => `時間: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        name="價格" 
                        stroke="#82ca9d" 
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PortfolioSimulation;
