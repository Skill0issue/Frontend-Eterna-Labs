const names = [
  "enemy",
  "toast",
  "orbit",
  "fury",
  "zenith",
  "nova",
  "flux",
  "vexon",
  "mirai",
  "onyx",
  "aster",
  "ripple",
  "warp",
  "pyro",
  "pixel"
];

export function randomLogoSymbol(name: string) {
  return {
    symbol: name.slice(0, 3),
    logo: `https://api.dicebear.com/8.x/shapes/svg?seed=${name}`
  };
}