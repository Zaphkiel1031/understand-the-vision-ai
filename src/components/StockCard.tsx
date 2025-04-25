
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StockChart from "./StockChart";
import { formatCurrency, formatPercentage, getPriceChangeClass } from "@/lib/stock-utils";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  percentChange: number;
  data: { date: string; price: number }[];
  onClick?: () => void;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  price,
  priceChange,
  percentChange,
  data,
  onClick,
}) => {
  const isPriceUp = priceChange >= 0;
  const priceChangeClass = getPriceChangeClass(priceChange);

  return (
    <Card 
      className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-bold">{symbol}</CardTitle>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{formatCurrency(price)}</p>
            <p className={`text-sm ${priceChangeClass}`}>
              {formatCurrency(priceChange)} ({formatPercentage(percentChange)})
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <StockChart data={data} isPriceUp={isPriceUp} height={130} />
      </CardContent>
    </Card>
  );
};

export default StockCard;
