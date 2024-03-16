function calculateNewAveragePrice({
  avgPrice,
  totalCount,
  changeCount,
  changePrice,
}: {
  avgPrice: number;
  totalCount: number;
  changeCount: number;
  changePrice: number;
}) {
  const totalValue = avgPrice * totalCount;
  let newValue;
  if (changeCount > 0) {
    // Adding items
    newValue = totalValue + changePrice * changeCount;
    totalCount += changeCount;
  } else {
    // Removing items
    if (Math.abs(changeCount) > totalCount) return 0;
    newValue = totalValue - avgPrice * Math.abs(changeCount);
    totalCount += changeCount;
  }
  return newValue / totalCount;
}
