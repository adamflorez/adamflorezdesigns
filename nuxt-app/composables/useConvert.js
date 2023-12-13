import convert from "convert";

const Convert = (num, from, to) => {
  return convert(num, from).to(to);
};

export default Convert;
