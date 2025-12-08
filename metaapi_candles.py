import requests
from typing import List, Dict

def get_candles(account_id: str, token: str, symbol: str = "XAUUSD", timeframe: str = "1m", limit: int = 100) -> List[Dict]:
    url = f"https://mt-client-api-v1.agiliumtrade.ai/users/current/accounts/{account_id}/historical-market-data/symbols/{symbol}/timeframes/{timeframe}/candles?limit={limit}"

    headers = {
        "auth-token": token
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"Erreur API MetaAPI: {response.status_code} - {response.text}")

    data = response.json()

    candles = [
        {
            "time": c["time"],
            "open": c["open"],
            "high": c["high"],
            "low": c["low"],
            "close": c["close"],
            "volume": c["tickVolume"]
        }
        for c in data
    ]

    return candles
