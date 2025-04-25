
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

interface StockChartProps {
  data: { date: string; price: number }[];
  isPriceUp: boolean;
  height?: number;
}

const StockChart: React.FC<StockChartProps> = ({ data, isPriceUp, height = 100 }) => {
  return (
    <div style={{ width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C176" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00C176" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5247" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF5247" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`$${value}`, "Price"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPriceUp ? "#00C176" : "#FF5247"}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color${isPriceUp ? 'Up' : 'Down'})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
