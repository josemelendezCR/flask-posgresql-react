import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from '../features/roles/rolesSlice';

export const store = configureStore({
  reducer: {
    roles: rolesReducer
  },
});
