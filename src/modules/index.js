import { combineReducers } from "redux";
import login from './login';

//루트 리듀서  여러개의 리듀서를 하나로 합침
const rootReducer = combineReducers({
    login
});

export default rootReducer;

