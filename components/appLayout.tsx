import { FC, PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar/navbar";
import MobileBottomNav from "./navbar/mobileBottomNav";
import { userSchema } from "@/config/user";

export const revalidate = 30;

const getInitialData = async () => {
  const someData = await fetch("http://localhost:3000/api/test", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "321",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (someData && someData.user) {
    return {
      isAuthenticated: true,
      user: userSchema.parse(someData.user),
    };
  }

  return { isAuthenticated: false };
}; //TODO: USER AUTH MOCKING IN DEVELOPMENT

const AppLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { isAuthenticated, user } = await getInitialData();

  return (
    <div>
      <div className="relative flex  flex-col">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <main className="md:container md:mx-auto md:px-2 p-0 m-0 min-w-full">
          {children}
        </main>

        <footer className="flex w-full items-center justify-center py-3">
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
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
