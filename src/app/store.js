import userDetail from "../features/UserDetailSlice";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        app: userDetail,
    }
})

export default store