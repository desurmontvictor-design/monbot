from tradebrain.indicators import calculate_ema, calculate_atr

# Bougies mockées (structure identique à MetaAPI)
mock_candles = [
    {"time": f"2025-12-08T10:{str(i).zfill(2)}:00Z", "open": 2070+i, "high": 2071+i, "low": 2069+i, "close": 2070.5+i, "volume": 1000+i}
    for i in range(50)
]

ema20 = calculate_ema(mock_candles, 20)
ema50 = calculate_ema(mock_candles, 50)
atr = calculate_atr(mock_candles, 14)

print(f"EMA 20 : {ema20[-1]:.2f}")
print(f"EMA 50 : {ema50[-1]:.2f}")
print(f"ATR    : {atr:.2f}")
