import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {/* <RoleSubPages /> */}

      {children}
    </div>
  );
};

export default Layout;
