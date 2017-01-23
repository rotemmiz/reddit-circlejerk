import R from 'ramda';

export default getMaximumProp = (prop, values) => {

  if (values.length === 0) {
    return null;
  }

  const propValue = R.prop(prop);

  return R.reduce(
    (acc, cur) => R.max(acc, propValue(cur)),
    propValue(values[0]),
    values
  );
};
