
import React from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  return (
    <div className="pb-16 max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background p-4 border-b border-border">
        <h1 className="text-2xl font-bold">設定</h1>
      </header>
      
      <main className="p-4 space-y-6">
        {/* User Settings */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold">用戶設定</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-base">推播通知</Label>
              <Switch id="notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-base">深色模式</Label>
              <Switch id="darkMode" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="biometrics" className="text-base">使用生物認證</Label>
              <Switch id="biometrics" />
            </div>
          </CardContent>
        </Card>
        
        {/* App Settings */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold">應用設定</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="defaultCurrency" className="text-base">預設貨幣</Label>
              <select 
                id="defaultCurrency"
                className="bg-transparent border rounded-md p-1"
              >
                <option value="TWD">TWD</option>
                <option value="USD">USD</option>
                <option value="CNY">CNY</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="refreshRate" className="text-base">更新頻率</Label>
              <select 
                id="refreshRate"
                className="bg-transparent border rounded-md p-1"
              >
                <option value="5">5 秒</option>
                <option value="30">30 秒</option>
                <option value="60">1 分鐘</option>
                <option value="300">5 分鐘</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        {/* About */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">關於應用</h2>
            <p className="text-muted-foreground">財富追蹤 v1.0.0</p>
            <p className="text-muted-foreground">© 2025 財富追蹤團隊</p>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default SettingsPage;
