// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../GlobalContexts/Base_url";

// let token = "";
// setInterval(() => {
//   token = localStorage.getItem("access");
// }, 0.000000000000000000000000000000001);

// export const fetchUserProfile = createAsyncThunk(
//   "fetchUserProfile",
//   async () => {
//     try {
//       const userProfile = await axiosInstance.get(
//         "/userApp/userprofiles/my_profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return userProfile.data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// );

// const userProfileSlice = createSlice({
//   name: "userProfile",
//   initialState: {
//     isLoading: false,
//     userProfile: null,
//     error: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserProfile.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.userProfile = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.error = true;
//       });
//   },
// });

// export default userProfileSlice.reducer;
