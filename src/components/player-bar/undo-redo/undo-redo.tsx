import { component$ } from "@builder.io/qwik";

export const UndoRedo = component$(() => {
  return (
    <>
      <button>{"<-"}</button>
      <button>{"->"}</button>
    </>
  );
});
