export const random = {
  int(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  float(min: number, max: number, decimals = 2) {
    return Number((Math.random() * (max - min) + min).toFixed(decimals));
  },
  bool(weight = 0.5) {
    return Math.random() < weight;
  },
  pick<T>(arr: T[]) {
    return arr[this.int(0, arr.length - 1)];
  }
};
