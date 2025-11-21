export function generateSparkline(
  length = 50,
  start = 100,
  volatility = 0.03 // 3%
) {
  const data: number[] = [start];

  for (let i = 1; i < length; i++) {
    // random percentage move
    const changePercent = (Math.random() * 2 - 1) * volatility;

    // new value based on previous value
    const newValue = data[i - 1] * (1 + changePercent);

    data.push(Number(newValue.toFixed(2)));
  }

  return data;
}

