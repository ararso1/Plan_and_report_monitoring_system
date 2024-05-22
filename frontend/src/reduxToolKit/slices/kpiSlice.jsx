import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInistance from "../../GlobalContexts/Base_url";

let token = "";
setInterval(() => {
  token = localStorage.getItem("access");
}, 0.01);

//fetch kpi
export const fetchKpiData = createAsyncThunk("fetchKpiData", async () => {
  try {
    const kpiData = await axiosInistance.get("/planApp/getKPI", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return kpiData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

//delete selected kpi
export const deleteSelectedKpiData = createAsyncThunk(
  "deleteSelectedKpiData",
  async (selectedId) => {
    try {
      await axiosInistance.delete(`/planApp/deleteKPI/${selectedId}/`, {
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

//add new kpi
// export const addNewKpi = createAsyncThunk(
//   "addNewKpi",
//   async ({
//     name,
//     main_goal_id,
//     initial,
//     first_quarter_plan,
//     second_quarter_plan,
//     third_quarter_plan,
//     fourth_quarter_plan,
//     measure_id,
//     weight,
//   }) => {
//     try {
//       const res = await axiosInistance.post(
//         "/planApp/createKPI/",
//         {
//           name,
//           main_goal_id,
//           initial,
//           first_quarter_plan,
//           second_quarter_plan,
//           third_quarter_plan,
//           fourth_quarter_plan,
//           measure_id,
//           weight,
//         },
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

//edit kpi
export const editSelectedKpi = createAsyncThunk(
  "editSelectedKpi",
  async ({
    mainGoalIdEdit,
    kpiEdit,
    initialEdit,
    firstQuarterPlanEdit,
    secondQuarterPlanEdit,
    thirdQuarterPlanEdit,
    fourthQuarterPlanEdit,
    measureEdit,
    weightEdit,
    editId,
  }) => {
    try {
      await axiosInistance.put(
        `/planApp/updateKPI/${editId}/`,
        {
          name: kpiEdit,
          main_goal_id: mainGoalIdEdit,
          initial: initialEdit,
          first_quarter_plan: firstQuarterPlanEdit,
          second_quarter_plan: secondQuarterPlanEdit,
          third_quarter_plan: thirdQuarterPlanEdit,
          fourth_quarter_plan: fourthQuarterPlanEdit,
          measure_id: measureEdit,
          weight: weightEdit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        mainGoalIdEdit,
        kpiEdit,
        initialEdit,
        firstQuarterPlanEdit,
        secondQuarterPlanEdit,
        thirdQuarterPlanEdit,
        fourthQuarterPlanEdit,
        measureEdit,
        weightEdit,
        editId,
      };
    } catch (error) {
      console.error("Error edit data:", error);
    }
  }
);

const kpiSlice = createSlice({
  name: "kpi",
  initialState: {
    isLoading: false,
    kpiData: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKpiData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchKpiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kpiData = action.payload;
        // console.log(kpiData);
      })
      .addCase(fetchKpiData.rejected, (state, action) => {
        state.error = true;
      })

      //add
      // .addCase(addNewKpi.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(addNewKpi.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.kpiData.push(action.payload);
      // })
      // .addCase(addNewKpi.rejected, (state, action) => {
      //   state.error = true;
      // })

      //edit
      .addCase(editSelectedKpi.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editSelectedKpi.fulfilled, (state, action) => {
        state.isLoading = false;

        const {
          mainGoalIdEdit,
          kpiEdit,
          initialEdit,
          firstQuarterPlanEdit,
          secondQuarterPlanEdit,
          thirdQuarterPlanEdit,
          fourthQuarterPlanEdit,
          measureEdit,
          weightEdit,
          editId,
        } = action.payload;

        const targetDivisionId = state.kpiData.findIndex(
          (kpiData) => kpiData.id === editId
        );
        if (targetDivisionId !== -1) {
          state.kpiData[targetDivisionId].name = kpiEdit;

          state.kpiData[targetDivisionId].main_goal_id = mainGoalIdEdit;

          state.kpiData[targetDivisionId].first_quarter_plan =
            firstQuarterPlanEdit;

          state.kpiData[targetDivisionId].second_quarter_plan =
            secondQuarterPlanEdit;

          state.kpiData[targetDivisionId].third_quarter_plan =
            thirdQuarterPlanEdit;

          state.kpiData[targetDivisionId].fourth_quarter_plan =
            fourthQuarterPlanEdit;

          state.kpiData[targetDivisionId].weight = weightEdit;

          state.kpiData[targetDivisionId].measure_id = measureEdit;

          state.kpiData[targetDivisionId].initial = initialEdit;
        }
      })
      .addCase(editSelectedKpi.rejected, (state, action) => {
        state.error = true;
      })

      //delete
      .addCase(deleteSelectedKpiData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteSelectedKpiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kpiData = state.kpiData.filter(
          (items) => items.id !== action.payload
        );
      })
      .addCase(deleteSelectedKpiData.rejected, (state, action) => {
        state.error = true;
      });
  },
});

export default kpiSlice.reducer;
