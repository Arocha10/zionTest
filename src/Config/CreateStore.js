import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import rootReducer from "../Ducks";

// WHITELIST
const persistConfig = {
  key: "root",
  timeout: 60000,
  storage: storage,
  whitelist: ["Auth"] // only Auth will be persisted
};

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const middleware = [thunk, navigationMiddleware];

const getComposeEnhancers = () => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return compose(applyMiddleware(...middleware));
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, getComposeEnhancers());
  let persistor = persistStore(store);
  return { store, persistor };
};
