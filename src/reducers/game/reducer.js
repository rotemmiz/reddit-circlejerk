import R from 'ramda';

import * as types from './action-types';

import getMaximumProp from '../../utils/get-maximum-prop';

function getInitialState() {
  return {
    posts: [],
    currentPost: null,
    availablePosts: [],
    comments: [],
    score: 0,
    lives: 3,
    showPost: true,
    showAnswer: false,
    loading: true,
  };
}

export default function (state = getInitialState(), { type, payload }) {
  switch(type) {
    case types.AFTER_LOAD_POSTS:
      return {
        ...state,
        posts: payload,
        availablePosts: Object.keys(payload),
      };
    case types.SET_CURRENT_POST:
      return {
        ...state,
        currentPost: payload.currentPost,
        availablePosts: payload.availablePosts,
      };
    case types.AFTER_LOAD_COMMENTS:
      return {
        ...state,
        loading: false,
        comments: payload,
      };
    case types.ON_GUESS_COMMENT:
      return {
        ...state,
        score: state.score + 1,
        showAnswer: true,
      };
    case types.ON_FAIL_GUESS_COMMENT:
      return {
        ...state,
        score: state.score - 1,
        showAnswer: true,
      };
  }

  return state;
};

export function getCurrentLevel(state) {
  return R.keys(state.game.posts).length - state.game.availablePosts.length;
}

export function getTotalLevels(state) {
  return R.keys(state.game.posts).length;
}

export function getCurrentPost(state) {
  return state.game.posts[state.game.currentPost];
}

export function getCommentById(commentId, state) {
  return R.find(R.propEq('id', commentId), state.game.comments);
}

export function getComments(state) {
  const maxCommentsScore = getMaximumProp('score', state.game.comments);

  return state.game.comments.map(comment => ({
    ...comment,
    correct: maxCommentsScore === comment.score,
  }));
}

export function getScoreInfo(state) {
  return {
    score: state.game.score,
    lives: state.game.lives,
    currentLevel: getCurrentLevel(state),
    totalLevels: getTotalLevels(state),
  };
}

export function getSettings(state) {
  return R.pick(['showPost', 'showAnswer'], state.game);
}

export function getLoading(state) {
  return state.game.loading;
}
