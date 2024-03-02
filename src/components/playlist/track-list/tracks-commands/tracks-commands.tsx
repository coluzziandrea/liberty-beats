import { component$ } from "@builder.io/qwik";

export const TracksCommands = component$(() => {
  return (
    <div class="flex flex-row">
      <button>{"+ Add Track"}</button>
    </div>
  );
});
