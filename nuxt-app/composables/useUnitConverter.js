import convert from "convert";

export function useUnitConverter(num, from, to) {
  const conversion = Factory(from, to);
  if (conversion) {
    let newVal = conversion(num);
    newVal = newVal.toFixed(2);
    return newVal
  } else {
    let val = convert(num, from).to(to);
    return val.toFixed(2)
  }
}
const tbspToGrams = (tbsp) => {
  return tbsp * 14.787;
};

const tbspToLbs = (tbsp) => {
  return tbsp / 30.675;
};

const tbspToOz = (tbsp) => {
  return tbsp / 1.917;
};

const tspToGrams = (tsp) => {
  return tsp * 4.9289;
};

const ozToGal = (oz) => {
  return oz * 0.007489;
};

const Factory = (from, to) => {
  switch (from) {
    case "tbsp":
      if (to === "g") return tbspToGrams;
      else if (to === "lbs") return tbspToLbs;
      else if (to === "oz") return tbspToOz;
      break;
    case "tsp":
      if (to === "g") return tspToGrams;
      // other cases here...
      break;
    case "oz":
      if (to === "gal") return ozToGal;
      break;
    default:
      break;
  }
};
