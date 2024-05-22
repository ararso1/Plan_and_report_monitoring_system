import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // No need for tableData here, as we only care about toggle values
  toggleRole: {}, // Object to store toggle state for each item (indexed by ID or some unique identifier)
};

const roleSwitchSlice = createSlice({
  name: "roleSwitch",
  initialState,
  reducers: {
    setToggleRole(state, action) {
      const { id, value } = action.payload; // Destructure id and value from payload
      state.toggleRole[id] = value; // Update the toggle value for the specific id
    },
  },
});

export const { setToggleRole } = roleSwitchSlice.actions;
export const roleSwitchReducer = roleSwitchSlice.reducer;
