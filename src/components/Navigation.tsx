
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ChartBar, Settings } from "lucide-react";

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "首頁",
      icon: <Home size={20} />,
      path: "/"
    },
    {
      label: "搜尋",
      icon: <Search size={20} />,
      path: "/search"
    },
    {
      label: "投資組合",
      icon: <ChartBar size={20} />,
      path: "/portfolio"
    },
    {
      label: "設定",
      icon: <Settings size={20} />,
      path: "/settings"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
