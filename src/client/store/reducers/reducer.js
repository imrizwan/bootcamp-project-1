const chatReducerDefaultState = [];

export default (state = chatReducerDefaultState, action) => {
    switch (action.type) {
        case 'SUBMIT_CHAT':
            return [...action.data.details.msgArrive, action.data.details.message]
        default:
            return state;
    }
}