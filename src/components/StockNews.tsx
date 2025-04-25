
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStockNews } from "@/lib/stock-utils";

const StockNews: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">財經新聞</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {mockStockNews.map((newsItem) => (
            <a 
              key={newsItem.id}
              href={newsItem.url}
              className="flex items-center p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 pr-4">
                <h3 className="font-medium text-sm mb-1">{newsItem.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{newsItem.source}</span>
                  <span className="mx-1">•</span>
                  <span>{newsItem.time}</span>
                </div>
              </div>
              {newsItem.imageUrl && (
                <div className="w-20 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={newsItem.imageUrl} 
                    alt={newsItem.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockNews;
