import {AppRootStateType} from "../store";

export const getCharacters = (state: AppRootStateType) => {
    return state.characters.characters
}
