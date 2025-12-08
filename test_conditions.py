from datetime import datetime, timedelta
from tradebrain.conditions import is_time_allowed, is_news_soon, is_strong_trend

# 🕒 Test is_time_allowed
now = datetime.fromisoformat("2025-12-08T10:30:00")
print("✅ Heure OK :", is_time_allowed(now))  # Doit afficher True

# 🔔 Test is_news_soon
fake_news = [
    {"time": "2025-12-08T10:40:00", "impact": "high"},
    {"time": "2025-12-08T11:00:00", "impact": "low"},
]
print("⚠️ News dans 10 min :", is_news_soon(fake_news, now))  # Doit afficher True

# 📉 Test is_strong_trend
ema20 = [2050.0 + i*0.3 for i in range(20)]  # croissante
ema50 = [2050.0 + i*0.1 for i in range(20)]  # plus lente
print("📈 Tendance forte :", is_strong_trend(ema20, ema50))  # Doit afficher True
