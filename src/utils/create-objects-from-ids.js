import R from 'ramda';

export default createObjectsFromIds = R.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: cur }), {}
);
