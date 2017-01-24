import R from 'ramda';

export default getObjectByMaximumProp = (prop, values) => {

  if (values.length === 0) {
    return {};
  }

  const propValue = R.prop(prop);

  return R.reduce(
    R.maxBy(propValue),
    values[0],
    values
  );
};
