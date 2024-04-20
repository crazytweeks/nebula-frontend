import React from "react";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";

const UnderDevelopmentAlert = () => {
  return (
    <div>
      <AlertTitle
        className="
        text-center
        font-bold
        text-warning-500
      "
      >
        Under Development 🚧
      </AlertTitle>
      <AlertDescription className="text-[10px] text-center">
        we are working on it...{" "}
      </AlertDescription>
    </div>
  );
};

export default UnderDevelopmentAlert;
