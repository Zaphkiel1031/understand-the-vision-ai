
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatPercentage, getPriceChangeClass, mockStocks } from "@/lib/stock-utils";
import { Search } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter stocks based on search term
  const filteredStocks = mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">搜尋</h1>
        <div className="relative">
          <Input 
            type="text" 
            placeholder="輸入股票代碼或名稱" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
      </header>
      
      <main className="p-4">
        {searchTerm ? (
          <div className="space-y-1">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <div 
                  key={stock.id}
                  className="flex justify-between items-center py-3 border-b cursor-pointer"
                  onClick={() => navigate(`/stock/${stock.id}`)}
                >
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(stock.price)}</p>
                    <p className={`text-sm ${getPriceChangeClass(stock.percentChange)}`}>
                      {formatPercentage(stock.percentChange)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-muted-foreground">找不到符合條件的股票</p>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">熱門搜尋</h2>
            <div className="grid grid-cols-2 gap-3">
              {mockStocks.map((stock) => (
                <div 
                  key={stock.id}
                  className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/stock/${stock.id}`)}
                >
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default SearchPage;
