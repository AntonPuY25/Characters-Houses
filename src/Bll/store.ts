import {createStore} from "redux";
import {applyMiddleware} from "redux";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import CharacterReducer from "./reducers/characterReducer";
import HousesReducer from "./reducers/housesReducer";


let rootReducer = combineReducers({
  characters:CharacterReducer,
  houses:HousesReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
