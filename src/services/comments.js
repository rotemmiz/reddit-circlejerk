import R from 'ramda';

import propertiesFromData from '../utils/properties-from-data';

const filterComments = R.filter(({ kind }) => kind === 't1');

export const getComments = R.pipe(
  filterComments,
  propertiesFromData(['id', 'body', 'score']),
);
