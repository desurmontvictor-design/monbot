from datetime import datetime, timedelta
from typing import List, Dict

def is_time_allowed(current_time: datetime, start_hour: int = 8, end_hour: int = 21) -> bool:
    """Vérifie si on est dans la plage horaire autorisée (ex: 8h à 21h)"""
    return start_hour <= current_time.hour < end_hour

def is_news_soon(news_list: List[Dict], current_time: datetime, window_minutes: int = 15) -> bool:
    """Vérifie si une news rouge est prévue dans les X prochaines minutes"""
    for news in news_list:
        news_time = datetime.fromisoformat(news["time"])  # format ISO
        if news["impact"] == "high":
            delta = (news_time - current_time).total_seconds() / 60
            if -window_minutes <= delta <= window_minutes:
                return True
    return False

def is_strong_trend(ema20: List[float], ema50: List[float], threshold: float = 0.1) -> bool:
    """Vérifie si la tendance est claire (écart suffisant entre EMA20 et EMA50)"""
    if len(ema20) < 1 or len(ema50) < 1:
        return False
    return abs(ema20[-1] - ema50[-1]) > threshold
