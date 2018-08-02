const submitAdReducerDefaultState = [];

export default (state = submitAdReducerDefaultState, action) => {
    switch(action.type){
        case 'SUBMIT_FORM':
            return {...state}
        default:
            return state;
    }
}