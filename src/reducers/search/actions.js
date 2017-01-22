import { getRandomSubreddit, getTopPosts } from '../../services/api';

import * as gameActions from '../game/actions';

export function onClickRandom() {
  return async (dispatch) => {
    const subredditName = 'all'; //await getRandomSubreddit();

    const topPosts = await getTopPosts(subredditName);

    dispatch(gameActions.afterLoadPosts(topPosts));

  }
}
