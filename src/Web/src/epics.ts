import { combineEpics } from "redux-observable";
import triggerEpics from "./config/triggers";

export default combineEpics(
    triggerEpics
);


