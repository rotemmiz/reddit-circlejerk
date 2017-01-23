import R from 'ramda';

//['a', 'b'] -> [{ data: { a: 3, b: 4, c: 5 } }, ...] -> [{ a: 3, b: 4}, ..]
export default getPropertiesFromData = props => R.map(
  R.pipe(
    R.prop('data'),
    R.pick(props),
  )
);
