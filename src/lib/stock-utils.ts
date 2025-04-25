
// Generate mock stock data
export function generateMockStockData(days = 30) {
  let price = Math.random() * 100 + 50;
  const data: { date: string; price: number }[] = [];
  
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Add some randomness to the price
    price = price + (Math.random() * 6 - 3);
    if (price < 0) price = Math.random() * 10;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return data;
}

// Format currency
export function formatCurrency(value: number, currency = 'USD'): string {
  // If currency is an empty string, default to 'TWD' (New Taiwan Dollar)
  const currencyCode = currency === '' ? 'TWD' : currency;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
  
  return value >= 0 ? `+${formatted}` : formatted;
}

// Determine if a value represents a gain or loss
export function getPriceChangeClass(value: number): string {
  if (value > 0) return 'positive-value';
  if (value < 0) return 'negative-value';
  return 'neutral-value';
}

// Sample stock data
export const mockStocks = [
  {
    id: '1',
    symbol: '0050.TW',
    name: '富邦台灣50',
    price: 107.55,
    priceChange: 0.75,
    percentChange: 0.69,
    volume: 1661,
    data: generateMockStockData(),
  },
  {
    id: '2',
    symbol: '2330.TW',
    name: '台積電',
    price: 753.00,
    priceChange: 13.00,
    percentChange: 1.75,
    volume: 25450,
    data: generateMockStockData(),
  },
  {
    id: '3',
    symbol: '2308.TW',
    name: '台達電',
    price: 292.50,
    priceChange: -3.50,
    percentChange: -1.18,
    volume: 5842,
    data: generateMockStockData(),
  },
  {
    id: '4',
    symbol: '2454.TW',
    name: '聯發科',
    price: 945.00,
    priceChange: 15.00,
    percentChange: 1.61,
    volume: 3521,
    data: generateMockStockData(),
  },
];

// Sample portfolio data
export const mockPortfolio = {
  totalValue: 253481.25,
  totalReturn: 28145.75,
  percentReturn: 12.48,
  stocks: [
    {
      id: '1',
      symbol: '0050.TW',
      name: '富邦台灣50',
      shares: 500,
      costBasis: 102.35,
      currentPrice: 107.55,
      value: 53775,
      gain: 2600,
      percentGain: 5.08,
    },
    {
      id: '2',
      symbol: '2330.TW',
      name: '台積電',
      shares: 100,
      costBasis: 695.50,
      currentPrice: 753.00,
      value: 75300,
      gain: 5750,
      percentGain: 8.27,
    },
    {
      id: '3',
      symbol: '2308.TW',
      name: '台達電',
      shares: 200,
      costBasis: 305.75,
      currentPrice: 292.50,
      value: 58500,
      gain: -2650,
      percentGain: -4.33,
    },
    {
      id: '4',
      symbol: '2454.TW',
      name: '聯發科',
      shares: 70,
      costBasis: 890.15,
      currentPrice: 945.00,
      value: 66150,
      gain: 3840,
      percentGain: 6.16,
    },
  ]
};

// Sample market indexes data
export const mockMarketIndexes = [
  {
    id: '1',
    name: '加權指數',
    value: 22209.10,
    change: 168.16,
    percentChange: 0.76,
    data: generateMockStockData(),
  },
  {
    id: '2',
    name: '道瓊工業',
    value: 41449.40,
    change: 523.21,
    percentChange: 1.28,
    data: generateMockStockData(),
  },
  {
    id: '3',
    name: 'S&P 500指數',
    value: 5606.98,
    change: 55.95,
    percentChange: 1.01,
    data: generateMockStockData(),
  },
  {
    id: '4',
    name: 'NASDAQ指數',
    value: 17544.58,
    change: 248.42,
    percentChange: 1.44,
    data: generateMockStockData(),
  },
  {
    id: '5',
    name: '日經225指數',
    value: 37677.06,
    change: 74.92,
    percentChange: 0.20,
    data: generateMockStockData(),
  },
  {
    id: '6',
    name: '香港恆生指數',
    value: 23689.72,
    change: 523.21,
    percentChange: 2.12,
    data: generateMockStockData(),
  }
];

// Sample stock news
export const mockStockNews = [
  {
    id: '1',
    title: '外資連續第16周買超台股 3月累計買超500億元',
    source: '財經新聞',
    time: '10:24',
    url: '#',
    imageUrl: null,
  },
  {
    id: '2',
    title: 'The T-Cross 對開休旅，優惠台幣 9萬元！',
    source: '汽車新聞',
    time: '09:45',
    url: '#',
    imageUrl: 'https://picsum.photos/seed/car1/100/60',
  },
  {
    id: '3',
    title: '台北獨享！外國投資者登記平台上線',
    source: '經濟日報',
    time: '08:32',
    url: '#',
    imageUrl: null,
  },
  {
    id: '4',
    title: '元宇宙風：政府推數位城市，和現實整合到80%，樂觀看待',
    source: '科技評論',
    time: '07:59',
    url: '#',
    imageUrl: 'https://picsum.photos/seed/tech1/100/60',
  },
  {
    id: '5',
    title: '全球出口：全球晶片競爭白熱化，台廠如何突破？',
    source: '產業分析',
    time: '07:13',
    url: '#',
    imageUrl: null,
  }
];
