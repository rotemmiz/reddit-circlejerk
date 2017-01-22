import R from 'ramda';

import * as types from './action-types';

import { returnMaximumProp } from '../../utils';

function getInitialState() {
  return {
    posts: [],
    currentPost: null,
    availablePosts: [],
    comments: [],
    score: 0,
    lives: 3,
    showTitle: true,
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
  return R.keys(state.posts).length - state.availablePosts.length;
}

export function getTotalLevels(state) {
  return R.keys(state.posts).length;
}

export function getCurrentPost(state) {
  return state.posts[state.currentPost];
}

export function getCommentById(commentId, state) {
  return R.find(R.propEq('id', commentId), state.comments);
}

export function getComments(state) {
  const maxCommentsScore = returnMaximumProp('score', state.comments);

  return state.comments.map(comment => ({
    ...comment,
    correct: maxCommentsScore === comment.score,
  }));
}
