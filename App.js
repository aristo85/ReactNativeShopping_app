import React, {useState, useRef, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductsOverviewScreen from "./screen/product/ProductsOverviewScreen";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import productReducer from "./store/reducer";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ProductsNavigator from './navigation/navigator';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import authReducer from "./store/authe/reducer";
import { NavigationActions } from 'react-navigation';


//setting up font families
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),    
  })
}
//combine all reducers here if there more than one 
const rootReducer = combineReducers({
  products: productReducer,
  authReducer: authReducer,
});
//creating store fore redux, gitting reducer and reduxthunk fro async. actions
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const navRef = useRef();
  const [dataLoaded, setDataLoaded] = useState(false);
  //navigating to the 'authScreen' whenever the logout is accured (manually or on timer)
  store.subscribe(() => {
    if (!store.getState().authReducer.userId) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'auth'}))
    }
  });

  //waitting for fonts to set up, then render
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} //this has to be a function and return a promise
        onFinish={() => setDataLoaded(true)} //a listener
	onError={(error) => console.log(error)} // in case of error fetchin, we can shoe alternative component or ~cl~
      />
    );
  }

  return (
    <Provider store={store}>
        <ProductsNavigator ref={navRef} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
