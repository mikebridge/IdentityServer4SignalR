
export const ADD_FLASH_MESSAGE = "flash/ADD_MESSAGE";

export const DELETE_FLASH_MESSAGE = "flash/DELETE_MESSAGE";

export const DELETE_ALL_FLASH_MESSAGES = "flash/DELETE_ALL_MESSAGES";


export interface IFlashMessage {
    id?: string;
    text: string;
    type: string;
}

export interface IFlashMessageProps {
    message: IFlashMessage;
    deleteFlashMessage: (id: String) => void;
}

export interface IFlashProps {
    messages?: IFlashMessage[];
    deleteFlashMessage: (id: String) => void;
}



