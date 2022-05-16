import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rolesService from './rolesService';

const initialState = {
  roles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: '',
  isAdded: false,
  role: {},
}

export const addRole = createAsyncThunk('roles/new', async (data, thunkAPI) => {
  try {
    return await rolesService.addRole(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
})

export const getTeamRoles = createAsyncThunk('roles/team-roles', async (team, thunkAPI) => {
  try {
    return await rolesService.getTeamRoles(team);
  } catch(err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    reset:(state) => {
      state.isLoading =  false
      state.isError = false
      state.isSuccess = false
      state.error = ''
      state.isAdded = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRole.fulfilled, (state, action) => {
        if(state.roles.length > 0 && state.roles[0].team === action.payload.team) {
          state.roles.push(action.payload)
        } else {
          state.role = action.payload
        }
        state.isError = false
        state.isLoading = false
        state.isSuccess = true
        state.error =  ''
      })
      .addCase(addRole.pending, (state) => {
        state.isLoading = true
        state.isAdded = false
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getTeamRoles.fulfilled, (state, action) => {
        state.roles = action.payload.roles
        state.isSuccess = true
        state.isLoading = false
      })
      .addCase(getTeamRoles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeamRoles.rejected, (state, action) => {
        state.isError = true
        state.error = action.payload.message
        state.isLoading = false
      })
  }
});

export const { reset } = rolesSlice.actions;
export default rolesSlice.reducer;