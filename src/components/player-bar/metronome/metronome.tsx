import { component$ } from "@builder.io/qwik";

export const Metronome = component$(() => {
  return (
    <div>
      <button>{"-"}</button>
      <span>{"120 bpm"}</span>
      <button>{"+"}</button>
    </div>
  );
});
