import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../src/redux/reducers'

export default configureStore({
  reducer: {
    data: apiReducer
  },
})