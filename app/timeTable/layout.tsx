import type { FC, PropsWithChildren, ReactNode } from "react";

type ParallelRoutes = {
  scheduler: ReactNode;
};

const TimeTableLayout: FC<PropsWithChildren<ParallelRoutes>> = ({
  children,
}) => {
  if (typeof window === undefined) return null;

  return <div>{children}</div>;
};

export default TimeTableLayout;
