import SubSettings from "@/components/settings/subSettings";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Spinner } from "@nextui-org/spinner";
import React, { FC, PropsWithChildren, Suspense } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card
      className={cn(
        "rounded-none m-0 border-none p-0",
        "shadow-none",
        "md:rounded-xl md:shadow-sm md:mt-2 mf:border"
      )}
    >
      <SubSettings />
      <Suspense
        fallback={
          <div
            className={cn(
              "absolute flex items-center justify-center",
              "rounded-none m-0 border-none p-0",
              "shadow-none",
              "md:rounded-xl md:shadow-sm md:mt-2 mf:border",
              "h-full w-full",
              "animate-pulse",
              "top-50 left-50 right-50 bottom-50"
              // "translate-y-1/2 translate-x-1/2 -rotate-12"
            )}
          >
            <Spinner />
          </div>
        }
      >
        <CardContent>{children}</CardContent>
      </Suspense>
    </Card>
  );
};

export default Layout;
