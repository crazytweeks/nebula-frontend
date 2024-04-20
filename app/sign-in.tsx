"use client";
import { Button } from "@/components/ui/button";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  return (
    <Button
      className="w-full h-8
        hover:bg-green-400 hover:text-black
        duration 500 
        bg-green-900 text-white
      "
      variant={"outline"}
      onClick={() => {
        onSignIn();
      }}
    >
      Sign In
    </Button>
  );
};

export default SignIn;
