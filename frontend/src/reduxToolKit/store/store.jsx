import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "../slices/roleSlice";
import useReducer from "../slices/userSlice";
// import userProfileReducer from "../slices/authContext";
import tokenRefresherSlice from "../slices/tokenRefresherSlice";
import divisionReducer from "../slices/divisionSlice";
import monitoringReducer from "../slices/monitoringSlice";
import sectorReducer from "../slices/sectorSlice";
import strategicGoalReducer from "../slices/strategicGoalSlice";
import mainGoalReducer from "../slices/mainGoalSlice";
import kpiReducer from "../slices/kpiSlice";
import measureReducer from "../slices/measureSlice";
import kpiDescriptionReducer from "../slices/kpiDescriptionSlice";
import permissionReducer from "../slices/permissionSlice";
import settingReducer from "../slices/settingSlice";

const store = configureStore({
  reducer: {
    // userProfile: userProfileReducer,
    role: roleReducer,
    user: useReducer,
    tokenRefresher: tokenRefresherSlice,
    division: divisionReducer,
    monitoring: monitoringReducer,
    sector: sectorReducer,
    strategicGoal: strategicGoalReducer,
    mainGoal: mainGoalReducer,
    kpi: kpiReducer,
    kpiDescription: kpiDescriptionReducer,
    measure: measureReducer,
    permission: permissionReducer,
    setting: settingReducer,
  },
});

export default store;
