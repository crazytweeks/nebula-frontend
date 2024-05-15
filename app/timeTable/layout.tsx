import type { FC, PropsWithChildren, ReactNode } from "react";

type ParallelRoutes = {
  scheduler: ReactNode;
};

const TimeTableLayout: FC<PropsWithChildren<ParallelRoutes>> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default TimeTableLayout;
