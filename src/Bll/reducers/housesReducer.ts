import {Dispatch} from "redux";
import {Api, TypeResponseDataHouse} from "../../Api/api";

const initialState:TypeInitialState = {
    house: null,
    status:'free',
    error:''
}

const getHousesAC = (houses: TypeResponseDataHouse) => {
    return {
        type: '/houses/GET_HOUSES',
        houses

    } as const
}
const getStatusAC = (status: TypeStatus) => {
    return {
        type: '/houses/SET_STATUS',
        status

    } as const
}
const HousesReducer = (state: TypeInitialState = initialState, actions: TypeActions): TypeInitialState => {

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
    |ReturnType<typeof getStatusAC>;
type TypeStatus = 'free' | 'loading'|'error'|'success';
type TypeInitialState = {
    house: TypeResponseDataHouse|null
    status:TypeStatus
    error:string
}


export default HousesReducer;