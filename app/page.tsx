import { siteConfig } from "@/config/site";

export const revalidate = 1;

const fetchData = async () => {
  // THIS IS SERVER SIDE HANDLER. Not client side.

  const time = new Date().toISOString();

  return { time };
};

export default async function Home() {
  const data = await fetchData();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <h1>
          {siteConfig.name}
          <span className="inline-block text-primary">.</span>
        </h1>
        <p>{siteConfig.description}</p>

        {data && <pre>{JSON.stringify(data ?? {}, null, 2)}</pre>}
      </div>
    </section>
  );
}
