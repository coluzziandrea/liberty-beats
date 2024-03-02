import { component$ } from "@builder.io/qwik";

export const Flatboard = component$(() => {
  return (
    <div>
      <button>{"|<"}</button>
      <button>{">"}</button>
      {/* <button>{"||"}</button> */}
      <button>{"[]"}</button>
      <span>{"00:00.0"}</span>
    </div>
  );
});
