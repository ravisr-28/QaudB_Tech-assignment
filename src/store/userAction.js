export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // TODO: We can call api for login user in this but for now i am loggin in using dummy data

      localStorage.setItem("user", JSON.stringify({ email, password }));
      dispatch({ type: "LOGIN_SUCCESS", payload: { email, password } });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: "Invalid email or password" });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT_USER" });
  };
};
