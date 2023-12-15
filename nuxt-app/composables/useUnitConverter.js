import convert from 'convert';

export function useUnitConverter() {
  const number = ref(0);
  const fromUnit = ref('');
  const toUnit = ref('');
  const result = ref(0);

  const convertUnits = () => {
    try {
      result.value = convert(number.value, fromUnit.value).to(toUnit.value);
    } catch (error) {
      console.error("Conversion error:", error.message);
      result.value = 0;
    }
  };

  return { number, fromUnit, toUnit, result, convertUnits };
}
