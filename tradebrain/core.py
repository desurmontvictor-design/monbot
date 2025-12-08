from datetime import datetime
from typing import List, Dict
from tradebrain.indicators import calculate_ema, calculate_atr
from tradebrain.conditions import is_time_allowed, is_news_soon, is_strong_trend

def analyze_market(candles: List[Dict], news: List[Dict], time: datetime, balance: float) -> Dict:
    """
    Analyse le marché et retourne une décision :
    - BUY / SELL / NO TRADE
    - SL / TP / lot size
    """

    if not is_time_allowed(time):
        return {"action": "NO TRADE", "reason": "Hors horaires"}

    if is_news_soon(news, time):
        return {"action": "NO TRADE", "reason": "News rouge à venir"}

    ema20 = calculate_ema(candles, 20)
    ema50 = calculate_ema(candles, 50)
    atr = calculate_atr(candles)

    if not is_strong_trend(ema20, ema50):
        return {"action": "NO TRADE", "reason": "Tendance trop faible"}

    last_candle = candles[-1]
    direction = "BUY" if ema20[-1] > ema50[-1] else "SELL"
    entry_price = last_candle["close"]

    sl_distance = atr  # distance dynamique via ATR
    if direction == "BUY":
        stop_loss = entry_price - sl_distance
        take_profit = entry_price + sl_distance * 2
    else:
        stop_loss = entry_price + sl_distance
        take_profit = entry_price - sl_distance * 2

    # Gestion du risque : 1% du capital
    risk_percent = 1.0
    risk_amount = balance * (risk_percent / 100)
    lot_size = round(risk_amount / sl_distance, 2)

    return {
        "action": direction,
        "entry_price": entry_price,
        "stop_loss": stop_loss,
        "take_profit": take_profit,
        "risk_percent": risk_percent,
        "lot_size": lot_size,
        "reason": f"{direction} validé (EMA + ATR)"
    }
