import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import rootReducer from '../redux/slice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (curryGetDefaultMiddleware) => curryGetDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;