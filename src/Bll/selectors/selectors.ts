import {AppRootStateType} from "../store";

export const getCharacters = (state: AppRootStateType) => {
    return state.characters.characters
}
export const getHouse = (state: AppRootStateType) => {
    return state.houses.house
}