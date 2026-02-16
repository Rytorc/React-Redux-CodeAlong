import { legacy_createStore, combineReducers } from "redux";
import reducer from "../reducers/entries.reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  return legacy_createStore(
    combineReducers({
        entries: reducer,
    }), 
    composeWithDevTools()
  );
}

export default configureStore;