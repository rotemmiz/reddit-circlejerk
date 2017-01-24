import R from 'ramda';

import { loadComments } from '../../services/api';
import getRandomValuesFromArray from '../../utils/get-random-values-from-array';
import { getPostByNumberInRow, getCommentById, getCommentWithMaximumScore, getAvailablePosts } from './reducer';

import * as types from './action-types';

export function afterLoadPosts(posts) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.AFTER_LOAD_POSTS,
      payload: posts,
    });

    const state = getState();

    //const { id, permalink } = game.posts[game.availablePosts[Math.floor(Math.random() * game.availablePosts.length)]];
    const { id, permalink } = getPostByNumberInRow(state, 0);

    dispatch({
      type: types.SET_CURRENT_POST,
      payload: {
        currentPost: id,
        availablePosts: R.tail(getAvailablePosts(state))
      },
    });

    const comments = await loadComments(permalink);

    const randomComments = getRandomValuesFromArray(10, comments);

    dispatch({
      type: types.AFTER_LOAD_COMMENTS,
      payload: randomComments,
    });

  }
}

export function onClickComment(commentId) {
  return async (dispatch, getState) => {
    const state = getState();

    const maxCommentsScore = getCommentWithMaximumScore(state).score;

    const currentCommentScore = getCommentById(commentId, state).score;

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
