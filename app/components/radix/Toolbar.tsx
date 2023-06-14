import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from "@radix-ui/react-icons";

const ToolbarComponent = () => (
  <Toolbar.Root
    className="flex w-fit rounded-md border-2 border-zinc-300 bg-white px-3 py-2 shadow-md"
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="bold"
        aria-label="Bold"
      >
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="italic"
        aria-label="Italic"
      >
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="strikethrough"
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="mx-[10px] w-[1px] bg-mauve6" />
    <Toolbar.ToggleGroup
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="left"
        aria-label="Left aligned"
      >
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="center"
        aria-label="Center aligned"
      >
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ml-1.5 inline-flex h-[25px] items-center justify-center rounded bg-white px-2 text-mauve11 first:ml-0 hover:bg-zinc-400 hover:text-bg focus:relative focus:shadow-[0_0_0_2px] focus:shadow-zinc-700 data-[state=on]:bg-zinc-800 data-[state=on]:text-bg"
        value="right"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  </Toolbar.Root>
);

export default ToolbarComponent;
