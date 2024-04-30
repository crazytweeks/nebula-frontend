import CacheComponent from "@/components/cacheComponent";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";
import { Suspense } from "react";

export const revalidate = 0;

const fetchData = async () => {
  // THIS IS SERVER SIDE HANDLER. Not client side.

  const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  return { time };
};

export default async function Home() {
  const data = await fetchData();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block justify-center text-center">
        <h1
          className={cn(
            "text-5xl font-bold leading-10 tracking-tight",
            //add some animation and styling to make it look cool
            "animate-pulse",

            // text gradient animation
            "bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent",
            "dark:text-transparent",

            //hover animations
            "hover:from-primary-600 hover:to-accent-600 hover:bg-clip-text hover:text-transparent hover:dark:text-transparent",
            "hover:cursor-pointer hover:transition hover:duration-300 hover:ease-in-out hover:scale-150 hover:mb-4"
          )}
        >
          {siteConfig.name}
          <span className="inline-block text-primary">.</span>
        </h1>
        <p>{siteConfig.description}</p>

        <h6>This is server side rendering.</h6>
        <br />

        <h2
          className={cn(
            "text-3xl font-bold leading-10 tracking-tight",
            "text-slate-900 dark:text-slate-100"
          )}
        >
          Data fetched at {data?.time}
        </h2>

        <Divider />

        <Suspense fallback={<Spinner />}>
          <CacheComponent />
        </Suspense>
      </div>
    </section>
  );
}
