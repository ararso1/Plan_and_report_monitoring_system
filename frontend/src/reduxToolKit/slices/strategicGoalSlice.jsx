import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInistance from "../../GlobalContexts/Base_url";

let token = "";
setInterval(() => {
  token = localStorage.getItem("access");
}, 0.01);

//fetch strategic gaol
export const fetchStrategicGoalData = createAsyncThunk(
  "fetchStrategicGoalData",
  async () => {
    try {
      const strategicGoalData = await axiosInistance.get(
        "/planApp/strategicGoals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return strategicGoalData.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }
);

//delete selected strategic gaol
export const deleteSelectedStrategicGoalData = createAsyncThunk(
  "deleteSelectedStrategicGoalData",
  async (selectedId) => {
    try {
      await axiosInistance.delete(
        `/planApp/deleteStrategicGoal/${selectedId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return selectedId;
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
);

// //add new strategic gaol
// export const addNewStrategicGoal = createAsyncThunk(
//   "addNewStrategicGoal",
//   async ({ name, year, weight }) => {
//     try {
//       const res = await axiosInistance.post(
//         "/planApp/setStrategicGoal/",
//         { name, year, weight },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // return res.data;
//     } catch (error) {
//       console.error("Error add new data:", error);
//       return error;
//     }
//   }
// );

//edit strategic gaol
export const editSelectedStrategicGoal = createAsyncThunk(
  "editSelectedStrategicGoal",
  async ({ nameEdit, yearEdit, weightEdit, editId }) => {
    try {
      await axiosInistance.put(
        `/planApp/updateStrategicGoal/${editId}/`,
        {
          name: nameEdit,
          year: yearEdit,
          weight: weightEdit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { nameEdit, yearEdit, weightEdit, editId };
    } catch (error) {
      console.error("Error edit data:", error);
    }
  }
);

//assign strategic gaol
export const assignStrategicGoal = createAsyncThunk(
  "assignStrategicGoal",
  async ({ selectedStrategicGoalId, selectedItems }) => {
    try {
      const res = await axiosInistance.post(
        `/planApp/assignGoal/`,
        {
          sector_id: selectedItems,
          strategic_goal_id: selectedStrategicGoalId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { selectedStrategicGoalId, selectedItems };
    } catch (error) {
      console.error("Error edit data:", error);
    }
  }
);

const strategicGoalSlice = createSlice({
  name: "strategicGoal",
  initialState: {
    isLoading: false,
    strategicGoalData: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder

      //fetch
      .addCase(fetchStrategicGoalData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchStrategicGoalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.strategicGoalData = action.payload;
      })
      .addCase(fetchStrategicGoalData.rejected, (state, action) => {
        state.error = true;
      })

      // //add new strategic goal
      // .addCase(addNewStrategicGoal.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(addNewStrategicGoal.fulfilled, (state, action) => {
      //   state.isLoading = false;

      //   // state.strategicGoalData.push(action.payload);
      // })
      // .addCase(addNewStrategicGoal.rejected, (state, action) => {
      //   state.error = true;
      // })

      //edit strategic goal
      .addCase(editSelectedStrategicGoal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editSelectedStrategicGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        const { nameEdit, yearEdit, weightEdit, editId } = action.payload;

        const targetDivisionId = state.strategicGoalData.findIndex(
          (strategicGoalData) => strategicGoalData.id === editId
        );

        if (targetDivisionId !== -1) {
          state.strategicGoalData[targetDivisionId].name = nameEdit;

          state.strategicGoalData[targetDivisionId].year = yearEdit;

          state.strategicGoalData[targetDivisionId].weight = weightEdit;
        }
      })
      .addCase(editSelectedStrategicGoal.rejected, (state, action) => {
        state.error = true;
      })

      //delete
      .addCase(deleteSelectedStrategicGoalData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSelectedStrategicGoalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.strategicGoalData = state.strategicGoalData.filter(
          (items) => items.id !== action.payload
        );
      })
      .addCase(deleteSelectedStrategicGoalData.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export default strategicGoalSlice.reducer;
