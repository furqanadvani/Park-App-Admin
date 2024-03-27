import { createSlice } from '@reduxjs/toolkit';

export const AllParkSlice = createSlice({
    name: 'AllPark',
    initialState: {
      AllParkResult: null,
    },
    reducers: {
        
      setAllParkResult: (state, action) => {
        state.AllParkResult = action.payload;
      },
    },
  });
  
  export const { setAllParkResult } = AllParkSlice.actions;
  export const selectAllparkhResult = state => state.AllPark.AllParkResult;
  
  export default AllParkSlice.reducer;