import convert from "convert";

export function useUnitConverter(num, from, to) {
  return convert(num, from).to(to);
}
