import {configureStore} from  "@reduxjs/toolkit"
import authSlice from "./authSlice"

const myStore = configureStore({
  reducer:{
    authSlice:authSlice
  }
})

export default myStore;

