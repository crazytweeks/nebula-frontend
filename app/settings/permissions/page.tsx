import React, { Suspense } from "react";
import Permissions from "@/components/settings/permissions/permissions";

const PermissionsPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        }
      >
        <Permissions />
      </Suspense>
    </div>
  );
};

export default PermissionsPage;
