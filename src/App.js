import React, { Component } from "react";
import { Root } from "native-base";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./Config/CreateStore";
import AppNavigation from "./Navigation/AppNavigation";
import { reduxifyNavigator } from "react-navigation-redux-helpers";

const { store, persistor } = createStore();

const AppNav = reduxifyNavigator(AppNavigation, "root");
const mapStateToProps = state => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(AppNav);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <AppWithNavigationState />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
