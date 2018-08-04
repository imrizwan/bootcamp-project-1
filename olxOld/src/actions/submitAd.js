import { database } from '../firebase/firebase';

// SUBMIT_AD

export const submitAd = (data) => ({
    type: 'SUBMIT_FORM',
    data
});

export const startSubmitAd = (formData = {}) => {
    return (dispatch) => {
        // Properties / For Rent / For Sale / New Projects
        if(formData.majorCategory === 'Properties'){
            if(formData.category === 'For Rent'){
                database.ref(`Forms/Properties/ForRent`).push(formData).then((ref)=>{
                    dispatch(submitAd({
                        ...formData
                    }));
                });
                // var storageRef = storage.ref()
                // var spaceRef = storageRef.child(formData.file);
                var file = formData.file;
                console.log(file);
                // spaceRef.put(file).then(function(snapshot) {
                // console.log('Uploaded a blob or file!');
                // });
            } else if(formData.category === 'For Sale'){
                database.ref(`Forms/Properties/ForSale`).push(formData).then((ref)=>{
                    dispatch(submitAd({
                        ...formData
                    }));
                });    
            } else if(formData.category === 'New Projects'){
                database.ref(`Forms/Properties/NewProjects`).push(formData).then((ref)=>{
                    dispatch(submitAd({
                        ...formData
                    }));
                });
            }
        }
        // put another code here
    }
}
