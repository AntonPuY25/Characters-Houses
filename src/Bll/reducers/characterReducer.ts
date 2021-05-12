import {Dispatch} from "redux";
import {Api, TypeCharacter} from "../../Api/api";

const initialState:TypeInitialState = {
    characters: [],
    status:'free',
    error:''


}

const getCharactersAC = (characters: TypeCharacter[]) => {
    return {
        type: '/characters/GET_CHARACTERS',
        characters

    } as const
}
const getStatusAC = (status: TypeStatus) => {
    return {
        type: '/characters/SET_STATUS',
        status

    } as const
}
const CharacterReducer = (state: TypeInitialState = initialState, actions: TypeActions): TypeInitialState => {

    switch (actions.type) {

        case "/characters/GET_CHARACTERS":
            return {
                ...state,
                characters: actions.characters
            }
        case "/characters/SET_STATUS":
            return{
                ...state,
                status:actions.status
            }
        default:
            return state
    }

}

export const getCharactersTC = () => async (dispatch: Dispatch<TypeActions>) => {
    dispatch(getStatusAC('loading'))
    try {
        let result: TypeCharacter[] = await Api.getCharacters()
        dispatch(getStatusAC('success'))
        dispatch(getCharactersAC(result))
    } catch (e) {
        console.log(e)
        dispatch(getStatusAC('error'))

    }

}

type TypeActions =
    |ReturnType<typeof getCharactersAC>
    |ReturnType<typeof getStatusAC>;
type TypeStatus = 'free' | 'loading'|'error'|'success';
type TypeInitialState = {
    characters: TypeCharacter[]
    status:TypeStatus
    error:string
}


export default CharacterReducer;