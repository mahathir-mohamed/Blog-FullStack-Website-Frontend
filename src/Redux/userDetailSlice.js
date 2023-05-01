import {createSlice,createAsyncThunk} from  '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../config/BaseApi';
import Cookies from 'js-cookie';
import {toast,ToastContainer} from 'react-toastify';
export const fetchPost = createAsyncThunk("post/fetchPost",async(id)=>{
    const author = Cookies.get('user_id').replace(/"|'/g, '')
    try{
         return axios.post(`${baseUrl}/delete/${id}`,{id:author}).then((res)=>{
            console.log(res.data.msg);
            if(res.status==200){
                 toast.success(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
            }else{
                toast.info(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
            }
            return res.data;
         })
    }catch(e){
        return e.message;
    }
})
const userDetailSlice = createSlice({
    name:"user",
    initialState:{
        userDetail:{},
        success:false,
        error:'',
        isLoading:false,
        BlogId:""
    },
    reducers:{
        AdduserDetails(state,action){
            state.userDetail=action.payload.userData
        },
        ToggleStatus(state,action){
            state.success=true
        },
        setBlogId(state,action){
            state.BlogId = action.payload.id;
        }
       
    },
     extraReducers:(builder)=>{
        builder.addCase(fetchPost.pending,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(fetchPost.fulfilled,(state,action)=>{
            state.isLoading=true;
            // state.post=action.payload;
        })
        builder.addCase(fetchPost.rejected,(state,action)=>{
            state.isLoading=false;
        })

       
     }
})

// export const DeleteItem = createAsyncThunk('/delete',async()=>{
//     const id = Cookies.get('user_id').replace(/"|'/g, '');
//     await axios.put(`${baseUrl}/delete/${id}`).then((res)=>{
//          console.log(res.data)
//     }).catch((e)=>{console.log(e)}); 
// })


export const userActions = userDetailSlice.actions;
export default userDetailSlice;
