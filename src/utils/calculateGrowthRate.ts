export const calculateGrowthRate = (data: any) => {
  let countData = [];
  data.pages.forEach(element => {
    countData.push(element.count);
  });
  let sumGR = 0;
  for (let i = 1; i <= countData.length; i++) {
    let diff = countData[i] - countData[i - 1];
    let value = (diff / countData[i - 1]) * 100;
    if (isNaN(value) == false && value != Infinity) {
      sumGR = sumGR + value;
    }
  }
  sumGR = sumGR / countData.length;
  if (isNaN(sumGR)) {
    return 0;
  }
  return sumGR.toFixed(0);
};
