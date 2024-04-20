"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
  return (
    <Button
      onClick={() => {
        onSignOut();
      }}
      className="w-full h-8
        hover:bg-orange-400 hover:text-black
        duration 500 
        bg-orange-900 text-white
      "
      variant={"outline"}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
