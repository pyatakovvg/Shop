
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './types';


const initialState = {
  isOpen: false,
  name: null,
};


export const KEY = 'dialog';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_DIALOG: return {
      ...state,
      isOpen: true,
      name: payload,
    };
    case CLOSE_DIALOG: return {
      ...state,
      isOpen: false,
      name: null,
    };

    default: return { ...state };
  }
}