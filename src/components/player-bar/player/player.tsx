import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

// import * as Tone from "tone";

export type PlayerProps = {
  isPlaying: boolean;
  onTogglePlay$: PropFunction<() => void>;
};

export const Player = component$(
  ({ isPlaying, onTogglePlay$ }: PlayerProps) => {
    return (
      <div>
        <button>{"|<"}</button>
        {isPlaying ? (
          <button onClick$={onTogglePlay$}>{"||"}</button>
        ) : (
          <button onClick$={onTogglePlay$}>{">"}</button>
        )}
        {/* <button
        onClick$={() => {
         
        }}
      >
        {">"}
      </button> */}
        {/* <button>{"||"}</button> */}
        <button>{"[]"}</button>
        <span>{"00:00.0"}</span>
      </div>
    );
  },
);
