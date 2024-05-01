import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const Vercel = () => {
  return (
    <div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Vercel;
