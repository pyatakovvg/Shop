
import { CHANGE_STATE } from './types';

const initialState = {
  isInitializing: true,
};

export const KEY = 'application';


export default (state = initialState, { type, payload }) => {

  switch (type) {
    case CHANGE_STATE: {
      return {
        ...state,
        isInitializing: payload,
      };
    }
    default: return state;
  }
}