import { cn } from "@/lib/utils";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div
        className={cn(
          "absolute flex items-center justify-center",
          "rounded-none m-0 border-none p-0",
          "shadow-none",
          "md:rounded-xl md:shadow-sm md:mt-2 mf:border",
          "h-full w-full",
          "animate-pulse",
          "top-50 left-50 right-50 bottom-50"
        )}
      >
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
