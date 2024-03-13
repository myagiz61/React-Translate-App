import { configureStore } from "@reduxjs/toolkit";
import transleteSlice from "./transleteSlice";

export const store = configureStore({ reducer: transleteSlice });
