import R from 'ramda';

export default getRandomValuesFromArray = (count, array, acc = []) => {
  if (count === 0) {
    return acc;
  }

  const index = Math.floor(Math.random() * array.length);

  const value = array[index];

  return getRandomValuesFromArray(count - 1, R.remove(index, 1, array), acc.concat([value]));
};
