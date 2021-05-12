
const initialState = {

}

const CharacterReducer = (state:TypeInitialState=initialState,actions:TypeActions):TypeInitialState=>{

    switch (actions.type) {


        default:
            return  state
    }

}


type TypeActions = any;
type TypeInitialState = {}

export default  CharacterReducer;