import React from "react";

export const Effect = () => {
  return (
    <div role="status" class="max-w-sm animate-pulse">
      <div class="h-2 bg-gray-200 rounded-full dark:bg-cyan-900 max-w-[360px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-cyan-900 mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-cyan-900 max-w-[330px] mb-2.5"></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-cyan-900 w-48 mb-4"></div>
    </div>
  );
};
