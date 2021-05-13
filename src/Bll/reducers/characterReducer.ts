import {Dispatch} from 'redux'
import {Api, TypeCharacter} from '../../Api/api'

const initialState: TypeInitialStateCharacter = {
    characters: [],
    status: 'free',
    error: ''


}

export const getCharactersAC = (characters: TypeCharacter[]) => {
    return {
        type: '/characters/GET_CHARACTERS',
        characters

    } as const
}
export const getStatusAC = (status: TypeStatus) => {
    return {
        type: '/characters/SET_STATUS',
        status

    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: '/characters/SET_ERROR',
        error

    } as const
}
const CharacterReducer = (state: TypeInitialStateCharacter = initialState, actions: TypeActions)
    : TypeInitialStateCharacter => {

    switch (actions.type) {

        case '/characters/GET_CHARACTERS':
            return {
                ...state,
                characters: actions.characters
            }
        case '/characters/SET_STATUS':
            return {
                ...state,
                status: actions.status
            }
        case '/characters/SET_ERROR':
            return {
                ...state,
                error: actions.error
            }
        default:
            return state
    }

}

export const getCharactersTC = (page: string, gender: string, culture: string) =>
    async (dispatch: Dispatch<TypeActions>) => {
    dispatch(getStatusAC('loading'))
    try {
        let result: TypeCharacter[] = await Api.getCharacters(page, gender, culture)
        dispatch(getStatusAC('success'))
        dispatch(getCharactersAC(result))
    } catch (e) {
        dispatch(getStatusAC('error'))

    }

}

type TypeActions =
    | ReturnType<typeof getCharactersAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setErrorAC>
type TypeStatus = 'free' | 'loading' | 'error' | 'success'
export type TypeInitialStateCharacter = {
    characters: TypeCharacter[]
    status: TypeStatus
    error: string
}


export default CharacterReducer