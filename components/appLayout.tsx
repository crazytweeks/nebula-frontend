import { FC, PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar/navbar";
// import MobileBottomNav from "./navbar/mobileBottomNav";

export const revalidate = 30;

const AppLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div>
      <div className="relative flex  flex-col">
        <Navbar isAuthenticated={false} user={undefined} />
        <main className="md:container md:mx-auto md:px-2 p-0 m-0 min-w-full">
          {children}
        </main>

        {/* <footer className="flex w-full items-center justify-center py-3">
          <div
            className="
            md:hidden
                bottom-0
                fixed
                px-4
                py-2
                "
                >
                <MobileBottomNav />
                </div>
              </footer> */}
      </div>
    </div>
  );
};

export default AppLayout;
