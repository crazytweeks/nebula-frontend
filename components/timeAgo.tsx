"use client";

//TODO: INCOMPLETE COMPONENT. TESTING COMPONENT
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";

import { cn } from "@/lib/utils";

type Props = {
  timeStamp: Date; // timestamp in seconds
};

type NumberAnimationProps = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  isLoading?: boolean;
};

const defaultPops: NumberAnimationProps = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  isLoading: true,
};

const _REFRESH_INTERVAL_MS = 1000; // Every 3 seconds refresh the time

const TimeAgo = ({ timeStamp }: Props) => {
  const [{ days, hours, minutes, seconds, isLoading }, setProps] =
    useState<NumberAnimationProps>(defaultPops);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime() / 1000;
      const diff = now - timeStamp.getTime() / 1000;

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor(((diff % 86400) % 3600) / 60);
      const seconds = Math.floor(((diff % 86400) % 3600) % 60);
      setProps({ days, hours, minutes, seconds, isLoading: false });
    }, _REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [timeStamp]);

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <Chip
      size="sm"
      variant="shadow"
      className="mr-2"
      color={
        days ? "danger" : (hours ? "warning" : "info") ? "primary" : "success"
      }
      startContent={
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4
        fill-white
        dark:fill-black
        "
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      <span className={cn("text-[0.7rem]")}>
        {days > 0 && `${days}d `}
        {hours > 0 && `${hours}h `}
        {minutes > 0 && `${minutes}m `}
        {seconds > 0
          ? `${seconds}s`
          : minutes
          ? ""
          : hours
          ? ""
          : days
          ? ""
          : ""}

        {isLoading ? "" : " ago"}
      </span>
    </Chip>
  );
};

const LoadingSkeleton = () => {
  return (
    <Skeleton
      className="h-6
      min-w-[4rem]
      rounded-full
      shadow-md
      dark:bg-slate-800 dark:shadow-black
    "
    >
      <Chip size="sm" variant="shadow" className="w-12" />
    </Skeleton>
  );
};

export default TimeAgo;
