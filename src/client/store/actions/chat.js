import { database } from '../../firebase/firebase';

// SUBMIT_AD

export const submitChat = (data) => ({
    type: 'SUBMIT_CHAT',
    data
});

export const startSubmitChat = (details = {}) => {
    return (dispatch) => {
        database.ref(`Chats/` + details.currentUserId + details.AduserId).push(details).then((ref) => {
            dispatch(submitChat({
                details
            }));
        });
    }
}
