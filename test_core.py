from datetime import datetime
from tradebrain.core import analyze_market

# Bougies mockées
mock_candles = [
    {"time": f"2025-12-08T10:{str(i).zfill(2)}:00Z", "open": 2070+i, "high": 2071+i, "low": 2069+i, "close": 2070.5+i, "volume": 1000+i}
    for i in range(50)
]

# News mockée
mock_news = [
    {"time": "2025-12-08T12:00:00", "impact": "high"},
    {"time": "2025-12-08T14:00:00", "impact": "low"},
]

# Heure actuelle simulée
now = datetime.fromisoformat("2025-12-08T10:30:00")

# Solde fictif
balance = 10000.0

# Analyse
result = analyze_market(mock_candles, mock_news, now, balance)

# Affichage
print("📊 Résultat analyse :")
for k, v in result.items():
    print(f"{k}: {v}")
