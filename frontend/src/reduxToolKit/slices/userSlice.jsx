import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../GlobalContexts/Base_url";

let token = "";
setInterval(() => {
  token = localStorage.getItem("access");
}, 0.01);

//fetch User Data
export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  try {
    const userData = await axiosInstance.get("/userApp/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

//delete Selected User
export const deleteSelectedUser = createAsyncThunk(
  "deleteSelectedUser",
  async (selectedId) => {
    try {
      await axiosInstance.delete(`/userApp/users/${selectedId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return selectedId;
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  }
);

//change Status Of Selected User
export const changeStatusOfSelectedUser = createAsyncThunk(
  "changeStatusOfSelectedUser",
  async ({ changeStatusId, currentItem }) => {
    try {
      await axiosInstance.put(
        `/userApp/users/${changeStatusId}/`,
        {
          status: !currentItem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id: changeStatusId, status: currentItem };
    } catch (error) {
      console.error("Error while changing Status:", error);
    }
  }
);

// //add new User
// export const addNewUser = createAsyncThunk(
//   "addNewUser",
//   async ({
//     email,
//     firstName,
//     lastName,
//     phone,
//     gender,
//     role,
//     monitoringId,
//     sectorId,
//     divisionId,
//   }) => {
//     try {
//       const NewUser = await axiosInstance.post(
//         "/userApp/users/",
//         {
//           email: email,
//           first_name: firstName,
//           last_name: lastName,
//           phone: phone,
//           gender: gender,
//           role: role,
//           monitoring_id: monitoringId,
//           sector_id: sectorId,
//           division_id: divisionId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return NewUser.data;
//     } catch (error) {
//       console.error("Error while adding new user data:", error);
//     }
//   }
// );

//edit User
export const editSelectedUser = createAsyncThunk(
  "EditSelectedUser",
  async ({
    emailEdit,
    firstNameEdit,
    lastNameEdit,
    phoneEdit,
    genderEdit,
    roleEdit,
    monitoringIdEdit,
    sectorIdEdit,
    divisionIdEdit,
    editUserId,
  }) => {
    try {
      const editUser = await axiosInstance.put(
        `/userApp/users/${editUserId}/`,
        {
          email: emailEdit,
          firtst_name: firstNameEdit,
          last_name: lastNameEdit,
          phone: phoneEdit,
          gender: genderEdit,
          role: roleEdit,
          monitoring_id: monitoringIdEdit,
          sector_id: sectorIdEdit,
          division_id: divisionIdEdit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        emailEdit,
        firstNameEdit,
        lastNameEdit,
        phoneEdit,
        genderEdit,
        roleEdit,
        monitoringIdEdit,
        sectorIdEdit,
        divisionIdEdit,
        editUserId,
      };
    } catch (error) {
      console.error("Error while adding new user data:", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    userData: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      //fetchUserData
      .addCase(fetchUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = true;
      })

      //deleteSelectedUser
      .addCase(deleteSelectedUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSelectedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = state.userData.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteSelectedUser.rejected, (state, action) => {
        state.error = true;
      })

      //changeStatusOfSelectedUser
      .addCase(changeStatusOfSelectedUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changeStatusOfSelectedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, status } = action.payload;
        const targetUserIndex = state.userData.findIndex(
          (user) => user.id === id
        );
        if (targetUserIndex !== -1) {
          state.userData[targetUserIndex].status = !status;
        }
      })
      .addCase(changeStatusOfSelectedUser.rejected, (state, action) => {
        state.error = true;
      });

    //add New user
    // .addCase(addNewUser.pending, (state, action) => {
    //   state.isLoading = true;
    // })
    // .addCase(addNewUser.fulfilled, (state, action) => {
    //   state.isLoading = false;

    //   state.userData.push(action.payload);
    // })
    // .addCase(addNewUser.rejected, (state, action) => {
    //   state.error = true;
    // });
  },
});

export default userSlice.reducer;
