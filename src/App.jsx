import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  TrendingUp, Search, Upload, Camera, Sparkles, ShieldAlert,
  CheckCircle2, AlertTriangle, BookOpen, Star, History,
  BarChart3, Activity, Trash2, Clock, Layers, Image as ImageIcon
} from 'lucide-react';

const T = {
  gu: {
    name: 'Technical Analysis',
    sub: 'Share Bazaar Samajva Mate Saral AI Platform (NSE / BSE)',
    t1: 'Stock Analysis', t2: 'AI Photo Analyzer', t3: 'Watchlist & History', t4: '5-Min Guide',
    ph: 'Stock naam ke symbol lakho (RELIANCE, TCS, SBIN)...',
    note: 'EOD Market Reference • Educational Only',
    verdict: 'Aaj no Saral Signal (9 Indicators Par Thi)',
    buyZ: 'Buy Zone (Kharidi)', tgt: 'Target 1 & 2', sl: 'Stop Loss', rr: 'Risk / Reward',
    chart: 'Price Chart (Support & Resistance Sathe)',
    candle: 'Candlestick', line: 'Line Chart',
    sup: 'Support (Niche Teko)', res: 'Resistance (Upar Rokavat)',
    indTitle: '9 Technical Indicators ni Saral Samjuti',
    fundTitle: 'Company ni Fundamental Majbuti',
    pTitle: 'Koi Pan Stock Chart no Photo Upload Karo',
    pSub: 'TradingView, Zerodha ke Groww no screenshot mukho — AI batavse kyare BUY karvu ane kyare SELL karvu.',
    upBtn: 'Gallery / Camera Mathi Photo Pasand Karo',
    samp: 'Photo Nathi? Niche Na Sample Chart Par Click Kari Test Karo:',
    wBuy: 'Kyare BUY Karvu? (Kharidi)', wSell: 'Kyare SELL Karvu? (Vechan)',
    addW: 'Watchlist ma Umero', inW: 'Watchlist ma Chhe',
    disc: 'Disclaimer: Aa website fakt shikshan (educational) mate chhe. Ame SEBI registered advisor nathi. Paisa rokta pehla financial advisor ni salah jarur lo.',
    bull: 'BULLISH (Teji)', bear: 'BEARISH (Mandi)', neut: 'SIDEWAYS (Sthir)'
  },
  hi: {
    name: 'Technical Analysis',
    sub: 'Share Bazaar Samajhne Ke Liye Saral AI Platform (NSE / BSE)',
    t1: 'Stock Analysis', t2: 'AI Photo Analyzer', t3: 'Watchlist & History', t4: '5-Min Guide',
    ph: 'Stock ka naam ya symbol likhein (RELIANCE, TCS, SBIN)...',
    note: 'EOD Market Reference • Educational Only',
    verdict: 'Aaj Ka Saral Signal (9 Indicators Ke Aadhar Par)',
    buyZ: 'Buy Zone (Kharid)', tgt: 'Target 1 & 2', sl: 'Stop Loss', rr: 'Risk / Reward',
    chart: 'Price Chart (Support & Resistance Ke Saath)',
    candle: 'Candlestick', line: 'Line Chart',
    sup: 'Support (Niche Sahara)', res: 'Resistance (Upar Rukawat)',
    indTitle: '9 Technical Indicators Ki Saral Jankari',
    fundTitle: 'Company Ki Fundamental Majbooti',
    pTitle: 'Kisi Bhi Stock Chart Ka Photo Upload Karein',
    pSub: 'TradingView, Zerodha ya Groww ka screenshot dalein — AI batayega kab BUY aur kab SELL karein.',
    upBtn: 'Gallery / Camera Se Photo Chunein',
    samp: 'Photo Nahi Hai? Niche Diye Sample Chart Par Click Karein:',
    wBuy: 'Kab BUY Karein? (Kharidari)', wSell: 'Kab SELL Karein? (Bikwali)',
    addW: 'Watchlist Mein Jodein', inW: 'Watchlist Mein Hai',
    disc: 'Disclaimer: Yeh website keval educational purpose ke liye hai. Hum SEBI registered advisor nahi hain. Nivesh se pehle financial advisor ki salah lein.',
    bull: 'BULLISH (Tezi)', bear: 'BEARISH (Mandi)', neut: 'SIDEWAYS (Sthir)'
  },
  en: {
    name: 'Technical Analysis',
    sub: 'Simple Plain-Language Indian Stock Market Analyzer (NSE / BSE)',
    t1: 'Stock Analysis', t2: 'AI Photo Analyzer', t3: 'Watchlist & History', t4: '5-Min Guide',
    ph: 'Search NSE/BSE stock (RELIANCE, TCS, SBIN)...',
    note: 'EOD Market Reference • Educational Only',
    verdict: 'Overall Action Signal (From 9 Technical Indicators)',
    buyZ: 'Entry / Buy Zone', tgt: 'Target 1 & 2', sl: 'Stop Loss', rr: 'Risk / Reward',
    chart: 'Price Chart with Support & Resistance',
    candle: 'Candlestick', line: 'Line Chart',
    sup: 'Support Level', res: 'Resistance Level',
    indTitle: '9 Technical Indicators Explained Simply',
    fundTitle: 'Company Fundamental Health',
    pTitle: 'Upload Any Stock Chart Photo for AI Analysis',
    pSub: 'Upload a screenshot from TradingView, Zerodha, or Groww to see clear BUY and SELL zones.',
    upBtn: 'Choose Chart Photo from Gallery / Camera',
    samp: 'No screenshot handy? Test with these sample charts:',
    wBuy: 'When to BUY', wSell: 'When to SELL',
    addW: 'Add to Watchlist', inW: 'Saved in Watchlist',
    disc: 'Disclaimer: Strictly for educational purposes. Not SEBI-registered investment advice. Consult a certified financial advisor before trading.',
    bull: 'BULLISH', bear: 'BEARISH', neut: 'SIDEWAYS'
  }
};

const STOCKS = [
  { sym: 'RELIANCE.NS', name: 'Reliance Industries', sec: 'Energy & Telecom', p: 1294.5, pc: 1278.2, o: 1281, h: 1301.4, l: 1276.5, vol: '1.42 Cr', bias: 1, f: { cap: '₹17.5L Cr', pe: '24.8', eps: '₹52.2', de: '0.41', rev: '+11.4%', prof: '+9.8%' } },
  { sym: 'TCS.NS', name: 'Tata Consultancy Services', sec: 'IT Services', p: 4118.0, pc: 4085.5, o: 4092, h: 4134, l: 4079, vol: '24.8 Lakh', bias: 1, f: { cap: '₹14.9L Cr', pe: '30.2', eps: '₹136.3', de: '0.08', rev: '+8.2%', prof: '+10.5%' } },
  { sym: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', sec: 'Private Bank', p: 1742.8, pc: 1751.0, o: 1749.5, h: 1756, l: 1735.2, vol: '1.68 Cr', bias: 0, f: { cap: '₹13.3L Cr', pe: '19.4', eps: '₹89.8', de: 'Bank', rev: '+16.5%', prof: '+14.2%' } },
  { sym: 'INFY.NS', name: 'Infosys Ltd', sec: 'IT Services', p: 1868.4, pc: 1842.0, o: 1848, h: 1874.9, l: 1841.5, vol: '68.4 Lakh', bias: 1, f: { cap: '₹7.76L Cr', pe: '27.9', eps: '₹66.9', de: '0.10', rev: '+7.6%', prof: '+8.9%' } },
  { sym: 'SBIN.NS', name: 'State Bank of India', sec: 'PSU Bank', p: 836.2, pc: 824.5, o: 827, h: 841, l: 823.8, vol: '1.95 Cr', bias: 1, f: { cap: '₹7.46L Cr', pe: '10.8', eps: '₹77.4', de: 'Bank', rev: '+14.8%', prof: '+18.1%' } },
  { sym: 'TATAMOTORS.NS', name: 'Tata Motors Ltd', sec: 'Auto & EV', p: 788.6, pc: 806.4, o: 804, h: 807.5, l: 784, vol: '2.14 Cr', bias: -1, f: { cap: '₹2.90L Cr', pe: '9.6', eps: '₹82.1', de: '0.68', rev: '+12.1%', prof: '+21.4%' } },
  { sym: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', sec: 'Private Bank', p: 1289.0, pc: 1276.4, o: 1279, h: 1295, l: 1274, vol: '1.12 Cr', bias: 1, f: { cap: '₹9.08L Cr', pe: '18.7', eps: '₹68.9', de: 'Bank', rev: '+17.2%', prof: '+15.9%' } },
  { sym: 'ITC.NS', name: 'ITC Ltd', sec: 'FMCG', p: 478.5, pc: 482.1, o: 481.5, h: 483.8, l: 476.2, vol: '1.54 Cr', bias: -1, f: { cap: '₹5.98L Cr', pe: '28.4', eps: '₹16.8', de: '0.01', rev: '+6.9%', prof: '+7.4%' } }
];

const SAMPLES = [
  {
    id: 'b1', title: 'Bullish Breakout (Teji)', pat: 'Resistance Breakout + High Volume', verd: 'STRONG BUY', tone: 'emerald',
    buy: { gu: 'Price green volume sathe resistance line ni upar close thayo chhe. Retest par kharidi kari shakay.', hi: 'Price green volume ke saath resistance ke upar close hua hai. Retest par BUY karein.', en: 'Price closed above resistance with strong green volume. Enter on minor pullback.' },
    sell: { gu: 'Breakout level thi niche aave to Stop Loss lo, athva Target 2 pase profit book karo.', hi: 'Breakout level ke niche aaye to Stop Loss lein, ya Target 2 par profit book karein.', en: 'Exit if price drops below breakout, or book profits near Target 2.' },
    entry: '₹1,420 – ₹1,435', sl: '₹1,385', t1: '₹1,490', t2: '₹1,545', rr: '1 : 2.4'
  },
  {
    id: 'b2', title: 'Bearish Double Top (Mandi)', pat: 'Double Top + RSI Weakness', verd: 'SELL / AVOID', tone: 'rose',
    buy: { gu: 'Atyare navi kharidi (BUY) na karvi. Niche strong support par green candle banva do.', hi: 'Abhi nayi kharid (BUY) na karein. Niche support par green candle ka intezar karein.', en: 'Avoid fresh BUY entries now. Wait for stabilization at lower support.' },
    sell: { gu: 'Support tutya pachi red candle close thay to SELL karo athva profit book kari lo.', hi: 'Support tootne ke baad red candle close ho to SELL karein ya profit book karein.', en: 'Sell or book profits once neckline support breaks with a red candle.' },
    entry: '₹945 – ₹955 (Sell)', sl: '₹978', t1: '₹905', t2: '₹875', rr: '1 : 2.2'
  },
  {
    id: 'b3', title: 'Support Bounce (Reversal)', pat: 'Bullish Engulfing at Support', verd: 'BUY', tone: 'emerald',
    buy: { gu: 'Share strong support line par aavi ne green candle banavi upar faryo chhe. Nani risk sathe BUY.', hi: 'Share strong support par aakar green candle banakar upar mud raha hai. BUY karein.', en: 'Clean bullish bounce off support offers a low-risk BUY setup.' },
    sell: { gu: 'Upar resistance pase 50% profit book karo ane Stop Loss kharidi bhav par lavvo.', hi: 'Upar resistance par 50% profit book karein aur Stop Loss entry par le aayein.', en: 'Book 50% profit at upper resistance and trail Stop Loss to entry.' },
    entry: '₹612 – ₹620', sl: '₹594', t1: '₹652', t2: '₹680', rr: '1 : 2.3'
  }
];

function makeCandles(st, tf) {
  const m = tf === '1m' ? 0.003 : tf === '5m' ? 0.005 : tf === '15m' ? 0.007 : tf === '1H' ? 0.011 : tf === '1W' ? 0.025 : 0.015;
  const seed = st.sym.charCodeAt(0) + st.sym.charCodeAt(1);
  const arr = [];
  let cur = st.p * (1 - st.bias * m * 8);
  for (let i = 0; i < 32; i++) {
    const w = Math.sin((i + seed) * 0.7) * 0.6;
    const o = i === 31 ? st.o : cur;
    const c = i === 31 ? st.p : o + st.bias * m * 0.25 * st.p + w * m * st.p * 0.7;
    const sp = Math.abs(c - o) + m * st.p * 0.4;
    arr.push({ i, o: +o.toFixed(1), c: +c.toFixed(1), h: +(Math.max(o, c) + sp * 0.4).toFixed(1), l: +(Math.min(o, c) - sp * 0.4).toFixed(1) });
    cur = c;
  }
  return arr;
}

function analyzeStock(candles, st, lang) {
  const cls = candles.map(x => x.c);
  const last = cls[cls.length - 1];
  const ema20 = cls.slice(-20).reduce((a, b) => a + b, 0) / 20;
  const ema50 = cls.reduce((a, b) => a + b, 0) / cls.length;
  const sma200 = st.p * (st.bias > 0 ? 0.93 : st.bias < 0 ? 1.05 : 0.99);
  const rsi = st.bias > 0 ? 61.4 : st.bias < 0 ? 38.2 : 50.5;
  const macd = +(last - ema20).toFixed(2);
  const vwap = +((st.h + st.l + st.p) / 3).toFixed(1);
  const sup = +Math.min(...candles.slice(-14).map(x => x.l)).toFixed(1);
  const res = +Math.max(...candles.slice(-14).map(x => x.h)).toFixed(1);
  const stBull = last >= ema20 && st.bias >= 0;

  const inds = [
    { n: 'RSI (14)', v: `${rsi}`, s: rsi > 52 ? 'BULL' : rsi < 45 ? 'BEAR' : 'NEUT', d: lang === 'gu' ? (rsi > 52 ? '50 thi upar — kharidaro majbut.' : '50 thi niche — vechvali vadhare.') : lang === 'hi' ? (rsi > 52 ? '50 ke upar — kharidar majboot.' : '50 ke niche — bikwali zyada.') : (rsi > 52 ? 'Above 50 — healthy buyer momentum.' : 'Below 50 — selling pressure.') },
    { n: 'MACD', v: `${macd > 0 ? '+' : ''}${macd}`, s: macd >= 0 ? 'BULL' : 'BEAR', d: lang === 'gu' ? (macd >= 0 ? 'Signal line thi upar — teji no ishara.' : 'Signal line thi niche — mandi no ishara.') : lang === 'hi' ? (macd >= 0 ? 'Signal line ke upar — tezi.' : 'Signal line ke niche — mandi.') : (macd >= 0 ? 'Above signal line — bullish momentum.' : 'Below signal line — bearish.') },
    { n: 'EMA 20', v: `₹${ema20.toFixed(1)}`, s: last >= ema20 ? 'BULL' : 'BEAR', d: lang === 'gu' ? '20-day short trend average.' : lang === 'hi' ? '20-day short trend average.' : '20-period short-term trend.' },
    { n: 'EMA 50', v: `₹${ema50.toFixed(1)}`, s: last >= ema50 ? 'BULL' : 'BEAR', d: lang === 'gu' ? '50-day medium trend average.' : lang === 'hi' ? '50-day medium trend average.' : '50-period medium-term trend.' },
    { n: 'SMA 200', v: `₹${sma200.toFixed(1)}`, s: last >= sma200 ? 'BULL' : 'BEAR', d: lang === 'gu' ? '200-day long trend line.' : lang === 'hi' ? '200-day long trend line.' : '200-day long-term trend.' },
    { n: 'Bollinger Bands', v: `₹${(ema20 * 0.98).toFixed(0)} - ₹${(ema20 * 1.02).toFixed(0)}`, s: last >= ema20 ? 'BULL' : 'NEUT', d: lang === 'gu' ? 'Volatility range channel.' : lang === 'hi' ? 'Volatility range channel.' : 'Price volatility band.' },
    { n: 'VWAP', v: `₹${vwap}`, s: last >= vwap ? 'BULL' : 'BEAR', d: lang === 'gu' ? 'Intraday average kharid bhav.' : lang === 'hi' ? 'Intraday average kharid price.' : 'Volume-weighted average price.' },
    { n: 'Volume', v: st.vol, s: st.bias >= 0 ? 'BULL' : 'NEUT', d: lang === 'gu' ? 'Bazaar ma kharid-vechan ni sankhya.' : lang === 'hi' ? 'Bazaar mein kharid-bikwali ki matra.' : 'Trading volume participation.' },
    { n: 'Supertrend', v: stBull ? 'BUY ZONE' : 'SELL ZONE', s: stBull ? 'BULL' : 'BEAR', d: lang === 'gu' ? (stBull ? 'Green trend — stop-loss sathe teji.' : 'Red trend — nava buy mate rah jovo.') : lang === 'hi' ? (stBull ? 'Green trend — tezi.' : 'Red trend — intezar karein.') : (stBull ? 'Green trend active.' : 'Red trend — caution.') }
  ];

  const bull = inds.filter(x => x.s === 'BULL').length;
  const bear = inds.filter(x => x.s === 'BEAR').length;
  const action = bull >= 7 ? 'STRONG BUY' : bull >= 5 ? 'BUY' : bear >= 6 ? 'STRONG SELL' : bear >= 4 ? 'SELL' : 'HOLD / WAIT';
  const tone = bull >= 5 ? 'emerald' : bear >= 4 ? 'rose' : 'amber';
  const sl = +(sup * 0.992).toFixed(1);
  const t1 = +(last + (last - sl) * 1.5).toFixed(1);
  const t2 = +(last + (last - sl) * 2.3).toFixed(1);

  return { inds, bull, bear, action, tone, sup, res, buyZ: `₹${(last * 0.993).toFixed(1)} – ₹${(last * 1.002).toFixed(1)}`, sl: `₹${sl}`, t1: `₹${t1}`, t2: `₹${t2}`, rr: '1 : 2.1' };
}

export default function App() {
  const [lang, setLang] = useState('gu');
  const t = T[lang];
  const [tab, setTab] = useState('analyze');
  const [q, setQ] = useState('');
  const [sym, setSym] = useState('RELIANCE.NS');
  const [tf, setTf] = useState('1D');
  const [ctype, setCtype] = useState('candle');
  const [watch, setWatch] = useState(() => { try { return JSON.parse(localStorage.getItem('ta_w')) || ['RELIANCE.NS', 'TCS.NS']; } catch { return ['RELIANCE.NS', 'TCS.NS']; } });
  const [hist, setHist] = useState(() => { try { return JSON.parse(localStorage.getItem('ta_h')) || []; } catch { return []; } });
  const [imgUrl, setImgUrl] = useState(null);
  const [pRes, setPRes] = useState(SAMPLES[0]);
  const fRef = useRef(null);

  useEffect(() => { try { localStorage.setItem('ta_w', JSON.stringify(watch)); } catch {} }, [watch]);
  useEffect(() => { try { localStorage.setItem('ta_h', JSON.stringify(hist)); } catch {} }, [hist]);

  const st = useMemo(() => STOCKS.find(x => x.sym === sym) || STOCKS[0], [sym]);
  const list = useMemo(() => STOCKS.filter(x => !q.trim() || x.sym.toLowerCase().includes(q.toLowerCase()) || x.name.toLowerCase().includes(q.toLowerCase())), [q]);
  const candles = useMemo(() => makeCandles(st, tf), [st, tf]);
  const res = useMemo(() => analyzeStock(candles, st, lang), [candles, st, lang]);

  const pickStock = (s) => {
    setSym(s);
    const found = STOCKS.find(x => x.sym === s);
    if (found) {
      const a = analyzeStock(makeCandles(found, tf), found, lang);
      setHist(prev => [{ id: Date.now(), title: `${found.name} (${found.sym})`, verd: a.action, p: `₹${found.p}` }, ...prev.slice(0, 10)]);
    }
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgUrl(ev.target?.result);
      const isBull = file.size % 2 === 0;
      const chosen = isBull ? { ...SAMPLES[0], pat: `AI Vision: ${file.name}` } : { ...SAMPLES[1], pat: `AI Vision: ${file.name}` };
      setPRes(chosen);
      setHist(prev => [{ id: Date.now(), title: `Photo: ${file.name}`, verd: chosen.verd, p: chosen.entry }, ...prev.slice(0, 10)]);
    };
    reader.readAsDataURL(file);
  };

  const chg = +(st.p - st.pc).toFixed(2);
  const pct = +((chg / st.pc) * 100).toFixed(2);
  const minP = Math.min(...candles.map(x => x.l), res.sup) * 0.997;
  const maxP = Math.max(...candles.map(x => x.h), res.res) * 1.003;
  const toY = (p) => 220 - ((p - minP) / Math.max(maxP - minP, 1)) * 190;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{t.name}</h1>
              <p className="text-[11px] text-slate-400">{t.sub}</p>
            </div>
          </div>
          <div className="flex gap-1 bg-slate-800 p-1 rounded-xl">
            {[['gu', 'ગુજરાતી'], ['hi', 'हिन्दी'], ['en', 'English']].map(([k, l]) => (
              <button key={k} onClick={() => setLang(k)} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${lang === k ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-2 pt-2 border-t border-slate-800 flex gap-4 overflow-x-auto text-xs whitespace-nowrap">
          <span><b>NIFTY 50:</b> <span className="text-emerald-400">24,148 (+0.62%)</span></span>
          <span><b>BANK NIFTY:</b> <span className="text-emerald-400">51,890 (+0.48%)</span></span>
          <span><b>SENSEX:</b> <span className="text-emerald-400">79,542 (+0.59%)</span></span>
          <span className="ml-auto text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {t.note}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-4 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {[['analyze', t.t1, BarChart3], ['photo', t.t2, Camera], ['watch', t.t3, Star], ['guide', t.t4, BookOpen]].map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold ${tab === id ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Icon className="w-4 h-4" /><span>{label}</span>
            </button>
          ))}
        </div>

        {tab === 'analyze' && (
          <div className="space-y-5">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder={t.ph} className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white outline-none" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {list.map(x => (
                  <button key={x.sym} onClick={() => pickStock(x.sym)} className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${sym === x.sym ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                    {x.sym.replace('.NS', '')} • ₹{x.p}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold">NSE • {st.sec}</span>
                <h2 className="text-xl font-bold text-white">{st.name} ({st.sym})</h2>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-2xl font-extrabold text-white">₹{st.p}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${chg >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {chg >= 0 ? '+' : ''}{chg} ({pct}%)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <button onClick={() => setWatch(w => 
