const getUser = () => {
  const user = localStorage.getItem("user");
  if (user != null) {
    return JSON.parse(user);
  } else return null;
};

const initialState = {
  user: getUser(),
  isLogginIN: false,
  loginError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        ...state,
        isLogginIN: true,
        loginError: null,
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        user: action.payload,
        isLogginIN: false,
        loginError: null,
      };
    }

    case "LOGIN_FAIL": {
      return {
        ...state,
        user: null,
        isLogginIN: false,
        loginError: action.payload,
      };
    }

    case "LOGOUT_USER": {
      return {
        ...state,
        user: null,
        isLogginIN: false,
        loginError: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
