import R from 'ramda';

const getData = props => R.map(
  R.pipe(
    R.prop('data'),
    R.pick(props),
  )
);

const getPostsWithEnoughComments = R.filter(R.propSatisfies(R.gt(R.__, 4), 'num_comments'));

const createObjectsFromIds = R.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: cur }), {}
);

export const getPosts = R.pipe(
  getData(['thumbnail', 'url', 'subreddit', 'id', 'permalink', 'title', 'ups', 'num_comments']),
  getPostsWithEnoughComments,
  createObjectsFromIds
);

const filterComments = R.filter(({ kind }) => kind === 't1');

export const getComments = R.pipe(
  filterComments,
  getData(['id', 'body', 'score']),
);

export const getRandomValuesFromArray = (count, array, acc = []) => {
  if (count === 0) {
    return acc;
  }

  const index = Math.floor(Math.random() * array.length);

  const value = array[index];

  return getRandomValuesFromArray(count - 1, R.remove(index, 1, array), acc.concat([value]));
};

export const returnMaximumProp = (prop, values) => {

  if (values.length === 0) {
    return null;
  }

  const propValue = R.prop(prop);

  return R.reduce(
    (acc, cur) => R.max(acc, propValue(cur)),
    propValue(values[0]),
    values
  );
}
