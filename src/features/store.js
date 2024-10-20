// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import homeReducer from './homeSlice'
import cardReducer from './serverSlice'
import qrcodeReducer from './QRSlice'
import settingsReducer from './settingsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    home:homeReducer,
    card:cardReducer,
    qrCode:qrcodeReducer,
    main:settingsReducer,
  },
});

export default store;
