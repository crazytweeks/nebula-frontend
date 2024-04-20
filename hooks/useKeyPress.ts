import { useEffect, useState } from "react";

interface Options {
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  debug?: boolean;
  key: string;
}

const useKeyPress = (props: Options | string) => {
  const {
    key,
    shiftKey = false,
    ctrlKey = false,
    altKey = false,
    metaKey = false,
    debug = false,
  } = typeof props === "string" ? { key: props } : props;

  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (ev: KeyboardEvent) => {
      if (debug) console.log("keyDown: ", ev.key);

      if (shiftKey && !ev.shiftKey) return false;
      if (ctrlKey && !ev.ctrlKey) return false;
      if (altKey && !ev.altKey) return false;
      if (metaKey && !ev.metaKey) return false;

      if (ev.key.toLowerCase() === key.toLowerCase()) setKeyPressed(true);
    };

    const upHandler = (ev: KeyboardEvent) => {
      if (debug) console.log("keyUp: ", ev.key);

      if (shiftKey && !ev.shiftKey) return true;
      if (ctrlKey && !ev.ctrlKey) return true;
      if (altKey && !ev.altKey) return true;
      if (metaKey && !ev.metaKey) return true;

      if (ev.key.toLowerCase() === key.toLowerCase()) setKeyPressed(false);
    };

    const handleListenToKeyPress = () => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    };

    const handleStopListenToKeyPress = () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };

    handleListenToKeyPress();

    return () => {
      handleStopListenToKeyPress();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO: check if this is correct

  return keyPressed;
};

export default useKeyPress;
