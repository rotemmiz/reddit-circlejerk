import R from 'ramda';

import { loadComments } from '../../services/api';
import { getRandomValuesFromArray, returnMaximumProp } from '../../utils';
import { getCommentById } from './reducer';

import * as types from './action-types';

export function afterLoadPosts(posts) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.AFTER_LOAD_POSTS,
      payload: posts,
    });

    const { game } = getState();

    const { id, permalink } = game.posts[game.availablePosts[0]];

    dispatch({
      type: types.SET_CURRENT_POST,
      payload: {
        currentPost: id,
        availablePosts: R.tail(game.availablePosts)
      },
    });

    const comments = await loadComments(permalink);

    const randomComments = getRandomValuesFromArray(4, comments);

    dispatch({
      type: types.AFTER_LOAD_COMMENTS,
      payload: randomComments,
    });

  }
}

export function onClickComment(commentId) {
  return async (dispatch, getState) => {
    const { game } = getState();

    const maxCommentsScore = returnMaximumProp('score', game.comments);

    const currentCommentScore = getCommentById(commentId, game).score;

    if (maxCommentsScore === currentCommentScore) {
      dispatch({
        type: types.ON_GUESS_COMMENT,
      });
    } else {
      dispatch({
        type: types.ON_FAIL_GUESS_COMMENT,
      });
    }

    setTimeout(() => {

    }, 2000);

  }
}
