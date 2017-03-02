import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGES, IFlashMessage } from "./flashConstants";

export function addFlashMessage(message: IFlashMessage) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    };
}

export function deleteFlashMessage(id: string) {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    };
}

export function deleteAllFlashMessages() {
    return {
        type: DELETE_ALL_FLASH_MESSAGES
    };
}

const addFlashSuccessMessage = (text: string) => addFlashMessage({text, type: "success"});

const addFlashErrorMessage = (text: string) => addFlashMessage({text, type: "error"});

export const flashActionCreators: any = {
    addFlashMessage,
    addFlashSuccessMessage,
    addFlashErrorMessage,
    deleteAllFlashMessages
};
