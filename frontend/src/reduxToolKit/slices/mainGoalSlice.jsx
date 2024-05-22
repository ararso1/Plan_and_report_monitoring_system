import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInistance from "../../GlobalContexts/Base_url";

let token = "";
setInterval(() => {
  token = localStorage.getItem("access");
}, 0.01);

//fetch main goal
export const fetchMainGoalData = createAsyncThunk(
  "fetchMainGoalData",
  async () => {
    try {
      const mainGoalData = await axiosInistance.get("/planApp/mainGoals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return mainGoalData.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

//delete selected main gaol
export const deleteSelectedMainGoalData = createAsyncThunk(
  "deleteSelectedMainGoalData",
  async (selectedId) => {
    try {
      await axiosInistance.delete(`/planApp/deleteMainGoal/${selectedId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return selectedId;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
);

//add new main gaol
// export const addNewMainGoal = createAsyncThunk(
//   "addNewMainGoal",
//   async ({ name, strategic_goal_id, weight }) => {
//     try {
//       const res = await axiosInistance.post(
//         "/planApp/setMainGoal/",
//         { name, strategic_goal_id, weight },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data;
//     } catch (error) {
//       console.error("Error add new data:", error);
//     }
//   }
// );

//edit main gaol
export const editSelectedMainGoal = createAsyncThunk(
  "editSelectedMainGoal",
  async ({ editName, editStrategicGoalId, editWeight, editId }) => {
    try {
      await axiosInistance.put(
        `/planApp/updateMainGoal/${editId}/`,
        {
          name: editName,
          strategic_goal_id: editStrategicGoalId,
          weight: editWeight,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { editName, editStrategicGoalId, editWeight, editId };
    } catch (error) {
      console.error("Error edit data:", error);
    }
  }
);

const mainGoalSlice = createSlice({
  name: "mainGoal",
  initialState: {
    isLoading: false,
    mainGoalData: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      //fetch data
      .addCase(fetchMainGoalData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchMainGoalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainGoalData = action.payload;
      })
      .addCase(fetchMainGoalData.rejected, (state, action) => {
        state.error = true;
      })

      // //add
      // .addCase(addNewMainGoal.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(addNewMainGoal.fulfilled, (state, action) => {
      //   state.isLoading = false;
      // })
      // .addCase(addNewMainGoal.rejected, (state, action) => {
      //   state.error = true;
      // })

      //edit
      .addCase(editSelectedMainGoal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editSelectedMainGoal.fulfilled, (state, action) => {
        state.isLoading = false;

        const { editName, editStrategicGoalId, editWeight, editId } =
          action.payload;

        const targetDivisionId = state.mainGoalData.findIndex(
          (mainGoalData) => mainGoalData.id === editId
        );

        if (targetDivisionId !== -1) {
          state.mainGoalData[targetDivisionId].name = editName;

          state.mainGoalData[targetDivisionId].strategic_goal_id =
            editStrategicGoalId;

          state.mainGoalData[targetDivisionId].weight = editWeight;
        }
      })

      .addCase(editSelectedMainGoal.rejected, (state, action) => {
        state.error = true;
      })

      //delete
      .addCase(deleteSelectedMainGoalData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSelectedMainGoalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainGoalData = state.mainGoalData.filter(
          (items) => items.id !== action.payload
        );
      })
      .addCase(deleteSelectedMainGoalData.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export default mainGoalSlice.reducer;
