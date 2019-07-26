// Action Types
export const ACTIONS = {
  CLEAR: "auth/CLEAR",
  UPDATE: "auth/UPDATE"
};

// Action Creators
export const update = payload => ({
  type: ACTIONS.UPDATE,
  payload
});

export const clear = _ => ({
  type: ACTIONS.CLEAR
});


const initialState = {
  actualUser: "",
  users:[],
};

const UsersReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.UPDATE: {
      return {
        ...state,
        ...payload
      };
    }
    case ACTIONS.CLEAR: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export default UsersReducer;
