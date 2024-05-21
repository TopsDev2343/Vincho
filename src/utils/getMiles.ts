export function getMiles(meters: any) {
  const tempMeters = meters * 0.000621371192;
  return tempMeters.toFixed(2);
}
