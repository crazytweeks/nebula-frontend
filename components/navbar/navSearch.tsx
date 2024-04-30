"use client";

import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { IconSearch } from "@icons/search";

const suggestions = ["Calendar", "Search Emoji", "Calculator"];

const NavSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      {value}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={value}
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((suggestion) => (
              <CommandItem
                key={suggestion}
                onSelect={() => {
                  setValue(suggestion);
                }}
              >
                {suggestion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <IconSearch className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        type="search"
      />
    </div>
  );
};

export default NavSearch;
