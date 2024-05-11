"use client";

import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div
      className={cn(
        "flex flex-col",
        "items-center justify-center",
        "h-full",
        "py-16 px-4",
        "gap-5"
      )}
    >
      <Image
        src="/assets/svg/404.svg"
        alt="404"
        width={500}
        height={500}
        content="404"
        className={cn("dark:text-white text-black")}
      />

      <Button as={Link} href={"/"}>
        Go Home
      </Button>
    </div>
  );
}
