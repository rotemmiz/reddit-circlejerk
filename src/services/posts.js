import R from 'ramda';

import propertiesFromData from '../utils/properties-from-data';
import fixImageUrls from '../utils/fix-image-urls';
import createObjectsFromIds from '../utils/create-objects-from-ids';

const fixThumbnailsAndUrls = R.map(
  post => ({
    ...post,
    thumbnail: fixImageUrls(post.thumbnail),
    url: fixImageUrls(post.url),
  })
);

const filterPostsWithEnoughComments = numOfComments =>
  R.filter(R.propSatisfies(R.gt(R.__, numOfComments), 'num_comments'));


export const transformResponseIntoPosts = numOfComments => R.pipe(
  propertiesFromData(['thumbnail', 'body', 'url', 'subreddit', 'id', 'permalink', 'title', 'ups', 'num_comments']),
  fixThumbnailsAndUrls,
  filterPostsWithEnoughComments(numOfComments),
  createObjectsFromIds
);
