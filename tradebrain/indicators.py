import pandas as pd
from typing import List, Dict

def calculate_ema(candles: List[Dict], period: int) -> List[float]:
    closes = [c['close'] for c in candles]
    df = pd.Series(closes)
    ema = df.ewm(span=period, adjust=False).mean()
    return ema.tolist()

def calculate_atr(candles: List[Dict], period: int = 14) -> float:
    highs = [c['high'] for c in candles]
    lows = [c['low'] for c in candles]
    closes = [c['close'] for c in candles]

    tr_list = []
    for i in range(1, len(candles)):
        high = highs[i]
        low = lows[i]
        prev_close = closes[i - 1]
        tr = max(high - low, abs(high - prev_close), abs(low - prev_close))
        tr_list.append(tr)

    atr = pd.Series(tr_list).rolling(window=period).mean().iloc[-1]
    return atr
