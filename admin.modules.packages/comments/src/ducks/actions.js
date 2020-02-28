
import {
  PAGE_IN_PROCESS,

  GET_COMMENTS_REQUEST,
  GET_COMMENTS_REQUEST_FAIL,
  GET_COMMENTS_REQUEST_SUCCESS,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_REQUEST_FAIL,
  CREATE_COMMENT_REQUEST_SUCCESS,

  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST_FAIL,
  UPDATE_COMMENT_REQUEST_SUCCESS,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST_FAIL,
  DELETE_COMMENT_REQUEST_SUCCESS,
} from './types';


export const pageInProcessAction = (payload) => ({ type: PAGE_IN_PROCESS, payload });

export const getCommentsRequestAction = () => ({ type: GET_COMMENTS_REQUEST });
export const getCommentsRequestFailAction = (error) => ({ type: GET_COMMENTS_REQUEST_FAIL, error });
export const getCommentsRequestSuccessAction = (payload) => ({ type: GET_COMMENTS_REQUEST_SUCCESS, payload });

export const createCommentRequestAction = () => ({ type: CREATE_COMMENT_REQUEST });
export const createCommentRequestFailAction = (error) => ({ type: CREATE_COMMENT_REQUEST_FAIL, error });
export const createCommentRequestSuccessAction = (payload) => ({ type: CREATE_COMMENT_REQUEST_SUCCESS, payload });

export const updateCommentRequestAction = () => ({ type: UPDATE_COMMENT_REQUEST });
export const updateCommentRequestFailAction = (error) => ({ type: UPDATE_COMMENT_REQUEST_FAIL, error });
export const updateCommentRequestSuccessAction = (payload) => ({ type: UPDATE_COMMENT_REQUEST_SUCCESS, payload });

export const deleteCommentsRequestAction = () => ({ type: DELETE_COMMENT_REQUEST });
export const deleteCommentsRequestFailAction = (error) => ({ type: DELETE_COMMENT_REQUEST_FAIL, error });
export const deleteCommentsRequestSuccessAction = (payload) => ({ type: DELETE_COMMENT_REQUEST_SUCCESS, payload });