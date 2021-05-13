import {Dispatch} from 'redux'
import {Api, TypeResponseDataHouse} from '../../Api/api'

const initialState:TypeInitialStateHouses = {
    house: null,
    status:'free',
    error:''
}

export const getHousesAC = (houses: TypeResponseDataHouse) => {
    return {
        type: '/houses/GET_HOUSES',
        houses

    } as const
}
export const getStatusAC = (status: TypeStatus) => {
    return {
        type: '/houses/SET_STATUS',
        status

    } as const
}
export const setErrorAC = (error: string)=>{
    return {
        type: '/characters/SET_ERROR',
        error

    } as const
}
const HousesReducer = (state: TypeInitialStateHouses = initialState, actions: TypeActions): TypeInitialStateHouses => {

    switch (actions.type) {

        case '/houses/GET_HOUSES':
            return {
                ...state,
                house: actions.houses
            }
        case '/houses/SET_STATUS':
            return{
                ...state,
                status:actions.status
            }
        case "/characters/SET_ERROR":
            return{
                ...state,
                error:actions.error
            }
        default:
            return state
    }

}

export const getHousesTC = (houseId:string) => async (dispatch: Dispatch<TypeActions>) => {
    dispatch(getStatusAC('loading'))
    try {
        let result: TypeResponseDataHouse = await Api.getHouses(houseId)
        dispatch(getStatusAC('success'))
        dispatch(getHousesAC(result))
    } catch (e) {
        console.log(e)
        dispatch(getStatusAC('error'))

    }

}

type TypeActions =
    |ReturnType<typeof getHousesAC>
    |ReturnType<typeof getStatusAC>
    |ReturnType<typeof setErrorAC>;
export type TypeStatus = 'free' | 'loading'|'error'|'success';
export type TypeInitialStateHouses = {
    house: TypeResponseDataHouse|null
    status:TypeStatus
    error:string
}


export default HousesReducer;