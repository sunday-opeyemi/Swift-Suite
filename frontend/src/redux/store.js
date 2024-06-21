import rootReducer from './stepReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: rootReducer,
})

export {store}