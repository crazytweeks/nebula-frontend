import type { FC, PropsWithChildren, ReactNode } from "react";

const TimeTableLayout: FC<PropsWithChildren> = ({ children }) => {
  if (typeof window === undefined) return null;

  return children;
};

export default TimeTableLayout;
