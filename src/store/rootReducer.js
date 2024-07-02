import { combineReducers } from "redux";
import userReducers from "@store/user/user.reducers";

export const rootReducer = combineReducers({
    user: userReducers,
});