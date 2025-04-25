
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PortfolioFormProps {
  onAddStock?: (stock: { symbol: string; shares: number; price: number }) => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ onAddStock }) => {
  const [symbol, setSymbol] = useState<string>("");
  const [shares, setShares] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStock = {
      symbol: symbol.toUpperCase(),
      shares: parseInt(shares, 10),
      price: parseFloat(price)
    };
    
    if (onAddStock && newStock.symbol && !isNaN(newStock.shares) && !isNaN(newStock.price)) {
      onAddStock(newStock);
      // Reset form
      setSymbol("");
      setShares("");
      setPrice("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">添加新股票</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新的股票到投資組合</DialogTitle>
          <DialogDescription>
            輸入股票代碼、持有數量和購買價格來追蹤您的投資.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">股票代碼</Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="例如: 2330.TW"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shares">持有數量</Label>
            <Input
              id="shares"
              type="number"
              min="1"
              step="1"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="例如: 100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">購買價格</Label>
            <Input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="例如: 550.5"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">確認</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioForm;
