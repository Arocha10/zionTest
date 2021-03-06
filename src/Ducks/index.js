import { combineReducers } from "redux";
import Auth from "./AuthReducer/AuthReducer";
import Users from "./UsersReducer/UsersReducer";
import AppNavigation from "../Navigation/AppNavigation";
import { createNavigationReducer } from "react-navigation-redux-helpers";

const navReducer = createNavigationReducer(AppNavigation);

const appReducer = combineReducers({
  Auth,
  Users,
  nav: navReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
