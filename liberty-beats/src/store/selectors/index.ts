import { RootState } from "..";

export const selectCounter = (state: RootState) => state.counter.value;
