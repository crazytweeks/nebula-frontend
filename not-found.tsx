"use client";

import { useEffect } from "react";

export default function Error(data: { error: Error; reset: () => void }) {
  const { error, reset } = data;
  console.log("data: ", data);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
