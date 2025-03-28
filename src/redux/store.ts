import { configureStore } from "@reduxjs/toolkit";
import personReducer from "@/redux/slice/personSlice";

const store = configureStore({
  reducer: {
    person: personReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
