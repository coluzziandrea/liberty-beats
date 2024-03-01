import { component$ } from "@builder.io/qwik";

export const MasterVolume = component$(() => {
  return (
    <>
      <label
        for="minmax-range"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Volume
      </label>
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="10"
        value="5"
        class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      ></input>
    </>
  );
});
