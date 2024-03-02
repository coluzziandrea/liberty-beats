import { component$ } from "@builder.io/qwik";

import * as Tone from "tone";

export const Player = component$(() => {
  return (
    <div>
      <button>{"|<"}</button>
      <button
        onClick$={() => {
          //create a synth and connect it to the main output (your speakers)
          const synth = new Tone.Synth().toDestination();

          //play a middle 'C' for the duration of an 8th note
          synth.triggerAttackRelease("C4", "8n");
        }}
      >
        {">"}
      </button>
      {/* <button>{"||"}</button> */}
      <button>{"[]"}</button>
      <span>{"00:00.0"}</span>
    </div>
  );
});
