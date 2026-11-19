import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Upload,
  Camera,
  Sparkles,
  ShieldAlert,
  Target,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Star,
  History,
  BarChart3,
  Activity,
  Trash2,
  Plus,
  Info,
  Clock,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

const TEXT = {
  gu: {
    appName: 'Technical Analysis',
    tagline: 'Share Bazaar Samajva Mate Saral AI Platform (NSE / BSE)',
    tabAnalyze: 'Stock Analysis',
    tabPhoto: 'AI Photo Analyzer',
    tabWatchlist: 'Watchlist & History',
    tabGuide: '5-Min Guide',
    searchPlaceholder: 'Stock naam athva symbol lakho (jem ke RELIANCE, TCS, SBIN)...',
    dataNote: 'EOD Market Reference Data • Educational Purpose Only',
    open: 'Open',
    high: 'Day High',
    low: 'Day Low',
    prevClose: 'Prev Close',
    volume: 'Volume',
    verdictTitle: 'Aaj no Saral Signal (9 Indicators Par Thi)',
    buyZone: 'Kharidva no Bhav (Buy Zone)',
    targets: 'Target 1 & Target 2',
    stopLoss: 'Stop Loss (Nuksan Rokva)',
    riskReward: 'Risk / Reward',
    whySignal: 'Aa Signal Kem Aavyo? (Saral Samjuti)',
    chartTitle: 'Interactive Price Chart (Support & Resistance Sathe)',
    candle: 'Candlestick',
    line: 'Line Chart',
    support: 'Support (Niche Teko)',
    resistance: 'Resistance (Upar Rokavat)',
    indicatorsTitle: '9 Technical Indicators ni Saral Mahiti',
    fundamentalsTitle: 'Company ni Fundamental Majbuti',
    marketCap: 'Market Cap',
    peRatio: 'P/E Ratio',
    eps: 'EPS (1 Share ni Kamai)',
    debtEquity: 'Debt / Equity (Karj)',
    revGrowth: 'Revenue Growth',
    profitGrowth: 'Profit Growth',
    photoTitle: 'Koi Pan Stock Chart no Photo Upload Karo',
    photoSub: 'TradingView, Zerodha, Groww ke Angel One no screenshot mukho — AI batavse kyare BUY karvu ane kyare SELL karvu.',
    uploadBtn: 'Gallery / Camera Mathi Photo Pasand Karo',
    sampleTitle: 'Photo Nathi? Niche Na Sample Chart Par Click Kari Test Karo:',
    whenBuy: 'Kyare BUY Karvu? (Kharidi)',
    whenSell: 'Kyare SELL Karvu? (Vechan)',
    patternDetected: 'Chart Pattern',
    addWatchlist: 'Watchlist ma Umero',
    inWatchlist: 'Watchlist ma Chhe',
    savedWatchlist: 'Tamari Pasandida Stocks (Watchlist)',
    analysisHistory: 'Juna Analysis no Record (History)',
    clearHistory: 'Clear Karo',
    noWatchlist: 'Haju koi stock watchlist ma nathi. Upar "Watchlist ma Umero" dabavo.',
    noHistory: 'Haju koi analysis save nathi thayu.',
    disclaimer: 'Disclaimer: Aa website fakt shikshan (educational) ane technical analysis samajva mate chhe. Ame SEBI registered advisor nathi. Paisa rokta pehla tamara financial advisor ni salah jarur lo.',
    bullish: 'BULLISH (Teji)',
    bearish: 'BEARISH (Mandi)',
    neutral: 'SIDEWAYS (Sthir)'
  },
  hi: {
    appName: 'Technical Analysis',
    tagline: 'Share Bazaar Samajhne Ke Liye Saral AI Platform (NSE / BSE)',
    tabAnalyze: 'Stock Analysis',
    tabPhoto: 'AI Photo Analyzer',
    tabWatchlist: 'Watchlist & History',
    tabGuide: '5-Min Guide',
    searchPlaceholder: 'Stock ka naam ya symbol likhein (jaise RELIANCE, TCS, SBIN)...',
    dataNote: 'EOD Market Reference Data • Educational Purpose Only',
    open: 'Open',
    high: 'Day High',
    low: 'Day Low',
    prevClose: 'Prev Close',
    volume: 'Volume',
    verdictTitle: 'Aaj Ka Saral Signal (9 Indicators Ke Aadhar Par)',
    buyZone: 'Kharidne Ka Zone (Buy Zone)',
    targets: 'Target 1 & Target 2',
    stopLoss: 'Stop Loss (Nuksan Rokne Ke Liye)',
    riskReward: 'Risk / Reward',
    whySignal: 'Yeh Signal Kyun Aaya? (Saral Bhasha Mein)',
    chartTitle: 'Interactive Price Chart (Support & Resistance Ke Saath)',
    candle: 'Candlestick',
    line: 'Line Chart',
    support: 'Support (Niche Sahara)',
    resistance: 'Resistance (Upar Rukawat)',
    indicatorsTitle: '9 Technical Indicators Ki Saral Jankari',
    fundamentalsTitle: 'Company Ki Fundamental Majbooti',
    marketCap: 'Market Cap',
    peRatio: 'P/E Ratio',
    eps: 'EPS (Prati Share Kamai)',
    debtEquity: 'Debt / Equity (Karz)',
    revGrowth: 'Revenue Growth',
    profitGrowth: 'Profit Growth',
    photoTitle: 'Kisi Bhi Stock Chart Ka Photo Upload Karein',
    photoSub: 'TradingView, Zerodha, Groww ya Angel One ka screenshot dalein — AI batayega kab BUY karein aur kab SELL karein.',
    uploadBtn: 'Gallery / Camera Se Photo Chunein',
    sampleTitle: 'Photo Nahi Hai? Niche Diye Sample Chart Par Click Karke Test Karein:',
    whenBuy: 'Kab BUY Karein? (Kharidari)',
    whenSell: 'Kab SELL Karein? (Bikwali)',
    patternDetected: 'Chart Pattern',
    addWatchlist: 'Watchlist Mein Jodein',
    inWatchlist: 'Watchlist Mein Hai',
    savedWatchlist: 'Aapke Pasandida Stocks (Watchlist)',
    analysisHistory: 'Purane Analysis Ka Record (History)',
    clearHistory: 'Clear Karein',
    noWatchlist: 'Abhi koi stock watchlist mein nahi hai.',
    noHistory: 'Abhi koi analysis save nahi hua hai.',
    disclaimer: 'Disclaimer: Yeh website keval educational aur technical analysis samajhne ke liye hai. Hum SEBI registered advisor nahi hain. Nivesh se pehle apne financial advisor ki salah lein.',
    bullish: 'BULLISH (Tezi)',
    bearish: 'BEARISH (Mandi)',
    neutral: 'SIDEWAYS (Sthir)'
  },
  en: {
    appName: 'Technical Analysis',
    tagline: 'Simple, Plain-Language Indian Stock Market Analyzer (NSE / BSE)',
    tabAnalyze: 'Stock Analysis',
    tabPhoto: 'AI Photo Analyzer',
    tabWatchlist: 'Watchlist & History',
    tabGuide: '5-Min Guide',
    searchPlaceholder: 'Search NSE/BSE stock by name or ticker (e.g., RELIANCE, TCS, SBIN)...',
    dataNote: 'EOD Market Reference Data • Educational Purpose Only',
    open: 'Open',
    high: 'Day High',
    low: 'Day Low',
    prevClose: 'Prev Close',
    volume: 'Volume',
    verdictTitle: 'Overall Action Signal (From 9 Technical Indicators)',
    buyZone: 'Entry / Buy Zone',
    targets: 'Target 1 & Target 2',
    stopLoss: 'Stop Loss (Max Risk)',
    riskReward: 'Risk / Reward',
    whySignal: 'Why This Signal? (Plain-Language Breakdown)',
    chartTitle: 'Interactive Price Chart with Support & Resistance',
    candle: 'Candlestick',
    line: 'Line Chart',
    support: 'Support Level',
    resistance: 'Resistance Level',
    indicatorsTitle: '9 Technical Indicators Explained Simply',
    fundamentalsTitle: 'Company Fundamental Health',
    marketCap: 'Market Cap',
    peRatio: 'P/E Ratio',
    eps: 'EPS (TTM)',
    debtEquity: 'Debt / Equity',
    revGrowth: 'Revenue Growth (YoY)',
    profitGrowth: 'Profit Growth (YoY)',
    photoTitle: 'Upload Any Stock Chart Photo for AI Analysis',
    photoSub: 'Upload a screenshot from TradingView, Zerodha, or Groww to get clear BUY and SELL zones.',
    uploadBtn: 'Choose Chart Photo from Gallery / Camera',
    sampleTitle: 'No screenshot handy? Test with these sample charts:',
    whenBuy: 'When to BUY',
    whenSell: 'When to SELL',
    patternDetected: 'Detected Pattern',
    addWatchlist: 'Add to Watchlist',
    inWatchlist: 'Saved in Watchlist',
    savedWatchlist: 'Your Saved Watchlist',
    analysisHistory: 'Recent Analysis History',
    clearHistory: 'Clear All',
    noWatchlist: 'No stocks in your watchlist yet. Tap "Add to Watchlist" on any stock.',
    noHistory: 'No saved analyses yet.',
    disclaimer: 'Disclaimer: This platform is strictly for educational and technical study purposes. We are not SEBI-registered investment advisors. Consult a certified financial advisor before trading.',
    bullish: 'BULLISH',
    bearish: 'BEARISH',
    neutral: 'SIDEWAYS'
  }
};

const STOCKS = [
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries Ltd',
    sector: 'Energy & Telecom',
    price: 1294.5,
    prevClose: 1278.2,
    open: 1281.0,
    high: 1301.4,
    low: 1276.5,
    volume: '1.42 Cr',
    trendBias: 1,
    fundamentals: {
      marketCap: '₹17.52 Lakh Cr',
      pe: '24.8',
      eps: '₹52.18',
      debtEquity: '0.41',
      revGrowth: '+11.4%',
      profitGrowth: '+9.8%'
    }
  },
  {
    symbol: 'TCS.NS',
    name: 'Tata Consultancy Services',
    sector: 'IT Services',
    price: 4118.0,
    prevClose: 4085.5,
    open: 4092.0,
    high: 4134.0,
    low: 4079.0,
    volume: '24.8 Lakh',
    trendBias: 1,
    fundamentals: {
      marketCap: '₹14.90 Lakh Cr',
      pe: '30.2',
      eps: '₹136.35',
      debtEquity: '0.08',
      revGrowth: '+8.2%',
      profitGrowth: '+10.5%'
    }
  },
  {
    symbol: 'HDFCBANK.NS',
    name: 'HDFC Bank Ltd',
    sector: 'Private Banking',
    price: 1742.8,
    prevClose: 1751.0,
    open: 1749.5,
    high: 1756.0,
    low: 1735.2,
    volume: '1.68 Cr',
    trendBias: 0,
    fundamentals: {
      marketCap: '₹13.28 Lakh Cr',
      pe: '19.4',
      eps: '₹89.80',
      debtEquity: 'N/A (Bank)',
      revGrowth: '+16.5%',
      profitGrowth: '+14.2%'
    }
  },
  {
    symbol: 'INFY.NS',
    name: 'Infosys Ltd',
    sector: 'IT Services',
    price: 1868.4,
    prevClose: 1842.0,
    open: 1848.0,
    high: 1874.9,
    low: 1841.5,
    volume: '68.4 Lakh',
    trendBias: 1,
    fundamentals: {
      marketCap: '₹7.76 Lakh Cr',
      pe: '27.9',
      eps: '₹66.95',
      debtEquity: '0.10',
      revGrowth: '+7.6%',
      profitGrowth: '+8.9%'
    }
  },
  {
    symbol: 'SBIN.NS',
    name: 'State Bank of India',
    sector: 'PSU Banking',
    price: 836.2,
    prevClose: 824.5,
    open: 827.0,
    high: 841.0,
    low: 823.8,
    volume: '1.95 Cr',
    trendBias: 1,
    fundamentals: {
      marketCap: '₹7.46 Lakh Cr',
      pe: '10.8',
      eps: '₹77.40',
      debtEquity: 'N/A (Bank)',
      revGrowth: '+14.8%',
      profitGrowth: '+18.1%'
    }
  },
  {
    symbol: 'TATAMOTORS.NS',
    name: 'Tata Motors Ltd',
    sector: 'Automobiles & EV',
    price: 788.6,
    prevClose: 806.4,
    open: 804.0,
    high: 807.5,
    low: 784.0,
    volume: '2.14 Cr',
    trendBias: -1,
    fundamentals: {
      marketCap: '₹2.90 Lakh Cr',
      pe: '9.6',
      eps: '₹82.10',
      debtEquity: '0.68',
      revGrowth: '+12.1%',
      profitGrowth: '+21.4%'
    }
  },
  {
    symbol: 'ICICIBANK.NS',
    name: 'ICICI Bank Ltd',
    sector: 'Private Banking',
    price: 1289.0,
    prevClose: 1276.4,
    open: 1279.0,
    high: 1295.0,
    low: 1274.0,
    volume: '1.12 Cr',
    trendBias: 1,
    fundamentals: {
      marketCap: '₹9.08 Lakh Cr',
      pe: '18.7',
      eps: '₹68.90',
      debtEquity: 'N/A (Bank)',
      revGrowth: '+17.2%',
      profitGrowth: '+15.9%'
    }
  },
  {
    symbol: 'ITC.NS',
    name: 'ITC Ltd',
    sector: 'FMCG & Hotels',
    price: 478.5,
    prevClose: 482.1,
    open: 481.5,
    high: 483.8,
    low: 476.2,
    volume: '1.54 Cr',
    trendBias: -1,
    fundamentals: {
      marketCap: '₹5.98 Lakh Cr',
      pe: '28.4',
      eps: '₹16.85',
      debtEquity: '0.01',
      revGrowth: '+6.9%',
      profitGrowth: '+7.4%'
    }
  }
];

function buildCandles(stock, timeframe) {
  const tfFactor =
    timeframe === '1m' ? 0.0025 :
    timeframe === '5m' ? 0.004 :
    timeframe === '15m' ? 0.006 :
    timeframe === '1H' ? 0.01 :
    timeframe === '1W' ? 0.028 : 0.015;

  const count = 36;
  const seedBase = stock.symbol.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const candles = [];
  let cursor = stock.price * (1 - stock.trendBias * tfFactor * 9);

  for (let i = 0; i < count; i++) {
    const wave = Math.sin((i + seedBase) * 0.65) * 0.5 + Math.cos((i * 1.3 + seedBase) * 0.4) * 0.5;
    const drift = stock.trendBias * tfFactor * 0.28 * stock.price;
    const open = i === count - 1 ? stock.open : cursor;
    let close =
      i === count - 1
        ? stock.price
        : open + drift + wave * tfFactor * stock.price * 0.75;

    if (close <= stock.price * 0.7) close = stock.price * 0.72;
    const spread = Math.abs(close - open) + tfFactor * stock.price * 0.45;
    const high = i === count - 1 ? stock.high : Math.max(open, close) + spread * 0.45;
    const low = i === count - 1 ? stock.low : Math.min(open, close) - spread * 0.45;
    const vol = Math.round(45 + Math.abs(wave) * 80 + (i % 5) * 12);

    candles.push({
      idx: i + 1,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: vol
    });
    cursor = close;
  }
  return candles;
}

function computeIndicators(candles, stock, lang) {
  const closes = candles.map((c) => c.close);
  const latest = closes[closes.length - 1];

  const calcEMA = (arr, period) => {
    const k = 2 / (period + 1);
    let ema = arr[0];
    for (let i = 1; i < arr.length; i++) {
      ema = arr[i] * k + ema * (1 - k);
    }
    return ema;
  };

  const ema20 = calcEMA(closes.slice(-20), 20);
  const ema50 = calcEMA(closes, 34);
  const sma200 = stock.price * (stock.trendBias > 0 ? 0.93 : stock.trendBias < 0 ? 1.05 : 0.99);

  let gains = 0;
  let losses = 0;
  for (let i = closes.length - 14; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  const rs = losses === 0 ? 4 : gains / losses;
  const rsi = Number((100 - 100 / (1 + rs)).toFixed(1));

  const ema12 = calcEMA(closes.slice(-12), 12);
  const ema26 = calcEMA(closes.slice(-26), 26);
  const macdLine = Number((ema12 - ema26).toFixed(2));
  const signalLine = Number((macdLine * 0.78).toFixed(2));

  const slice20 = closes.slice(-20);
  const mean20 = slice20.reduce((a, b) => a + b, 0) / slice20.length;
  const variance = slice20.reduce((a, b) => a + Math.pow(b - mean20, 2), 0) / slice20.length;
  const stdDev = Math.sqrt(variance);
  const bbUpper = Number((mean20 + 2 * stdDev).toFixed(2));
  const bbLower = Number((mean20 - 2 * stdDev).toFixed(2));

  const vwap = Number(
    (
      candles.slice(-10).reduce((acc, c) => acc + ((c.high + c.low + c.close) / 3) * c.volume, 0) /
      candles.slice(-10).reduce((acc, c) => acc + c.volume, 0)
    ).toFixed(2)
  );

  const avgVol = candles.slice(0, -1).reduce((a, c) => a + c.volume, 0) / (candles.length - 1);
  const lastVol = candles[candles.length - 1].volume;
  const volStrong = lastVol >= avgVol * 0.95;

  const supertrendBull = latest >= ema20 && stock.trendBias >= 0;

  const support = Number(Math.min(...candles.slice(-16).map((c) => c.low)).toFixed(2));
  const resistance = Number(Math.max(...candles.slice(-16).map((c) => c.high)).toFixed(2));

  const list = [
    {
      name: 'RSI (14)',
      value: `${rsi}`,
      signal: rsi >= 52 && rsi <= 72 ? 'BULL' : rsi < 45 ? 'BEAR' : 'NEUTRAL',
      desc:
        lang === 'gu'
          ? rsi > 70
            ? 'Share bahu vadhigayo chhe (Overbought) — thodo aaram lai sake.'
            : rsi >= 50
            ? 'Kharidaro ni takat vadhare chhe (50 thi upar majbut).'
            : 'Vechvali nu daban vadhare chhe (50 thi niche naram).'
          : lang === 'hi'
          ? rsi >= 50
            ? 'Kharidaron ki taqat zyada hai (50 ke upar majboot).'
            : 'Bikwali ka dabav zyada hai (50 ke niche kamzor).'
          : rsi >= 50
          ? 'Buyer momentum is healthy (above 50 neutral mark).'
          : 'Seller pressure dominates (below 50 mark).'
    },
    {
      name: 'MACD (12, 26, 9)',
      value: `${macdLine > 0 ? '+' : ''}${macdLine}`,
      signal: macdLine >= signalLine ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? macdLine >= signalLine
            ? 'MACD line signal line thi upar chhe — teji no ishara.'
            : 'MACD line signal line thi niche chhe — mandi no ishara.'
          : lang === 'hi'
          ? macdLine >= signalLine
            ? 'MACD line signal line ke upar hai — tezi ka sanket.'
            : 'MACD line signal line ke niche hai — mandi ka sanket.'
          : macdLine >= signalLine
          ? 'MACD is above signal line, indicating upward momentum.'
          : 'MACD is below signal line, indicating downward pressure.'
    },
    {
      name: 'EMA 20 (Short Trend)',
      value: `₹${ema20.toFixed(1)}`,
      signal: latest >= ema20 ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? latest >= ema20
            ? 'Bhav 20-day average thi upar chhe — tunka gala ma teji.'
            : 'Bhav 20-day average thi niche chhe — tunka gala ma naram.'
          : lang === 'hi'
          ? latest >= ema20
            ? 'Price 20-day average ke upar hai — short term mein tezi.'
            : 'Price 20-day average ke niche hai — short term kamzor.'
          : latest >= ema20
          ? 'Price trades above 20 EMA, supporting short-term uptrend.'
          : 'Price trades below 20 EMA, showing short-term weakness.'
    },
    {
      name: 'EMA 50 (Medium Trend)',
      value: `₹${ema50.toFixed(1)}`,
      signal: latest >= ema50 ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? latest >= ema50
            ? '50-day average thi upar — madhyam gala no trend majbut.'
            : '50-day average thi niche — upar jata rokavat aavi sake.'
          : lang === 'hi'
          ? latest >= ema50
            ? '50-day average ke upar — medium term trend majboot.'
            : '50-day average ke niche — upar rukawat aa sakti hai.'
          : latest >= ema50
          ? 'Price holds above 50 EMA, confirming medium-term strength.'
          : 'Price is under 50 EMA, acting as overhead resistance.'
    },
    {
      name: 'SMA 200 (Long Trend)',
      value: `₹${sma200.toFixed(1)}`,
      signal: latest >= sma200 ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? latest >= sma200
            ? '200-day moti average thi upar — lamba gala no trend positive.'
            : '200-day average thi niche — savcheti rakhvi jaruri.'
          : lang === 'hi'
          ? latest >= sma200
            ? '200-day badi average ke upar — long term trend positive.'
            : '200-day average ke niche — savdhani zaroori.'
          : latest >= sma200
          ? 'Trading above 200 SMA indicates a healthy long-term trend.'
          : 'Trading below 200 SMA signals a long-term bearish zone.'
    },
    {
      name: 'Bollinger Bands',
      value: `₹${bbLower} - ₹${bbUpper}`,
      signal: latest >= mean20 ? 'BULL' : 'NEUTRAL',
      desc:
        lang === 'gu'
          ? 'Bhav band ni vachche ane upar na bhag ma chhe — range majbut chhe.'
          : lang === 'hi'
          ? 'Price band ke madhya aur upari hisse mein hai.'
          : 'Price is positioned cleanly within the volatility channel.'
    },
    {
      name: 'VWAP (Intraday)',
      value: `₹${vwap}`,
      signal: latest >= vwap ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? latest >= vwap
            ? 'Mota traders ni average kharid kimat (VWAP) thi upar chhe.'
            : 'VWAP thi niche chhe — intraday ma vechvali vadhare.'
          : lang === 'hi'
          ? latest >= vwap
            ? 'Bade traders ki average kharid (VWAP) ke upar hai.'
            : 'VWAP ke niche hai — intraday mein dabav.'
          : latest >= vwap
          ? 'Trading above VWAP shows institutional buying interest.'
          : 'Trading below VWAP indicates intraday distribution.'
    },
    {
      name: 'Volume Strength',
      value: stock.volume,
      signal: volStrong ? 'BULL' : 'NEUTRAL',
      desc:
        lang === 'gu'
          ? volStrong
            ? 'Saru volume chhe — price move ma kharidaro no sath chhe.'
            : 'Sadharana volume chhe — moti move ni rah jovay chhe.'
          : lang === 'hi'
          ? volStrong
            ? 'Achha volume hai — price move ko support mil raha hai.'
            : 'Samanya volume hai — badi move ka intezar.'
          : volStrong
          ? 'Healthy volume participation confirms price action.'
          : 'Average volume suggests waiting for breakout confirmation.'
    },
    {
      name: 'Supertrend (10, 3)',
      value: supertrendBull ? 'BUY ZONE' : 'SELL ZONE',
      signal: supertrendBull ? 'BULL' : 'BEAR',
      desc:
        lang === 'gu'
          ? supertre
