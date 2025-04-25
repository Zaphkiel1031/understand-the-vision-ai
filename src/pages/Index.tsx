
import React from "react";
import { useNavigate } from "react-router-dom";
import PortfolioSummary from "@/components/PortfolioSummary";
import MarketOverview from "@/components/MarketOverview";
import StockNews from "@/components/StockNews";
import Navigation from "@/components/Navigation";
import { mockStocks } from "@/lib/stock-utils";
import StockCard from "@/components/StockCard";

const Index = () => {
  const navigate = useNavigate();
  
  // Take the first 2 stocks for the quick view
  const featuredStocks = mockStocks.slice(0, 2);
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border flex justify-between items-center">
        <h1 className="text-2xl font-bold">財富追蹤</h1>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Portfolio Summary */}
        <PortfolioSummary />
        
        {/* Featured Stocks */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">關注股票</h2>
          <div className="grid grid-cols-1 gap-4">
            {featuredStocks.map((stock) => (
              <StockCard
                key={stock.id}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                priceChange={stock.priceChange}
                percentChange={stock.percentChange}
                data={stock.data}
                onClick={() => navigate(`/stock/${stock.id}`)}
              />
            ))}
          </div>
          <button 
            className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            onClick={() => navigate('/watchlist')}
          >
            查看全部
          </button>
        </div>
        
        {/* Market Indexes */}
        <MarketOverview />
        
        {/* Financial News */}
        <StockNews />
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
