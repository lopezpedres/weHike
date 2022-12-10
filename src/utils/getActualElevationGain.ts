const elevationGain = (elevations: (number | null)[]) => {
  // Use the reduce method to iterate over the elevations and calculate the total elevation gain
  const noNull = elevations.filter((el): el is number => el != null);

  return noNull.reduce((total, current, index) => {
    // If this is the first elevation, there is no previous elevation to compare it to
    // so we can skip this iteration
    if (index === 0) {
      return total;
    }

    // Calculate the difference between the current elevation and the previous elevation
    const diff = current - noNull[index - 1];

    // If the difference is positive, add it to the total elevation gain
    // If the difference is negative or zero, ignore it
    if (diff > 0) {
      return total + diff;
    } else {
      return total;
    }
  }, 0);
};
export default elevationGain;
