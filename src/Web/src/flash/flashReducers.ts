import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGES } from "./flashConstants";
import * as shortid from "shortid";

export default (state = [], action: any) => {

    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = state.findIndex((m: any) => m.id === action.id);
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;
        case DELETE_ALL_FLASH_MESSAGES:
            return [];

        default: return state;
    }
};

