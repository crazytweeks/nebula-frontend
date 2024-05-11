"use client";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { cn } from "@/lib/utils";
import { Card } from "@nextui-org/card";
import { IconReload } from "@/components/icons/reload";
import { FC, PropsWithChildren } from "react";
import NextImage from "next/image";

type ErrorProps = {
  error?: Error;
  reset?: () => void;
};

const Error: FC<PropsWithChildren<ErrorProps>> = ({
  error,
  reset,
  children,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col",
        "items-center justify-center",
        "h-full",
        "py-16 px-4",
        "gap-5",
        "container mx-auto",
        "shadow-xl"
      )}
    >
      <Image
        src="/assets/svg/500.svg"
        alt="Error 500"
        height={450}
        width={300}
        priority={true}
        as={NextImage}
        className={cn("dark:text-white text-black")}
      />

      <span
        onClick={() => {
          // Log the error to an error reporting service
          console.error(error);
        }}
        className={cn(
          "text-lg font-bold",
          "text-warning",
          "hover:underline",
          "cursor-pointer",
          "hover:scale-95 hover:animate-caret-blink",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {error?.message}
      </span>

      {children}

      <div
        className={cn(
          "flex flex-row",
          "items-center",
          "gap-2",
          "w-full",
          "max-w-xs"
        )}
      >
        <Button
          onClick={reset}
          color="primary"
          variant="shadow"
          endContent={<IconReload />}
        >
          Reload Component
        </Button>

        <Button color="success" variant="shadow" as={Link} href={"/"}>
          Go Home
        </Button>
      </div>
    </Card>
  );
};

export default Error;
