import { getPosts, getComments } from '../utils';

const apiRoute = 'https://www.reddit.com';

export async function getRandomSubreddit() {

  const url = `${apiRoute}/r/random.json?limit=1`;

  try {
    const response = await fetch(url);

    const subredditName = response.url.split('/')[4];

    return subredditName;

  } catch(e) {
    console.error('failed to get random subreddit name!', e);

    return 'all';
  }

}

export async function getTopPosts(subredditName) {
  const url = `${apiRoute}/r/${subredditName}/top/.json?t=d&limit=25`;

  try {
    const response = await fetch(url);

    const json = await response.json();

    return getPosts(json.data.children);

  } catch(e) {
    console.error('failed to get random post from subreddit', subredditName, e);

    throw new Error(e);
  }
}

export async function loadComments(permalink) {
  const url = `${apiRoute}${permalink}.json?limit=30&depth=1`;

  try {
    const response = await fetch(url);

    const json = await response.json();

    return getComments(json[1].data.children);
  } catch (e) {
    console.error('Failed to load comments', e);

    throw new Error(e);
  }
}
