import type { FC, PropsWithChildren, ReactNode } from "react";

type ParallelRoutes = {
  scheduler: ReactNode;
};

const TimeTableLayout: FC<PropsWithChildren<ParallelRoutes>> = ({
  children,
  scheduler,
}) => {
  return (
    <div>
      {children}
      <div className="scheduler">{scheduler}</div>
    </div>
  );
};

export default TimeTableLayout;
