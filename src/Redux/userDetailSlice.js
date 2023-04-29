import {createSlice} from  '@reduxjs/toolkit';

const userDetailSlice = createSlice({
    name:"user",
    initialState:{
        userDetail:{},
        success:false
    },
    reducers:{
        AdduserDetails(state,action){
            state.userDetail=action.payload.userData
        },
        ToggleStatus(state,action){
            state.success=true
        }
    }
})

export const userActions = userDetailSlice.actions;
export default userDetailSlice;
