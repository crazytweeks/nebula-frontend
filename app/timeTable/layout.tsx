import { Divider } from "@nextui-org/divider";
import type { FC, PropsWithChildren, ReactNode } from "react";

type ParallelRoutes = {
  calender: ReactNode;
  scheduler: ReactNode;
};

const TimeTableLayout: FC<PropsWithChildren<ParallelRoutes>> = ({
  calender,
  scheduler,
  children,
}) => {
  if (typeof window === undefined) return null;

  return (
    <div className="container w-full h-full mx-auto">
      {children}
      {/* <div className="pt-6" />
      {calender}
      <Divider className="w-full m-6" /> */}
      {scheduler}
    </div>
  );
};

export default TimeTableLayout;
