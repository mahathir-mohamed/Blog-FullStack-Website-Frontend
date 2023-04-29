import {createSlice} from  'redux';

const userDetailSlice = createSlice({
    name:"user",
    initialState:{
        userDetail:{}
    },
    reducers:{
        AdduserDetails(state,action){
            state.userDetail=action.payload.username
        }
    }
})

export const userActions = userDetailSlice.actions;
export default userDetailSlice;
