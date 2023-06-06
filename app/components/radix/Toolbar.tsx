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
    className="shadow-blackA7 flex w-full min-w-max rounded-md bg-white p-[10px] shadow-[0_2px_10px]"
    aria-label="Formatting options"
  >
    <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="bold"
        aria-label="Bold"
      >
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="italic"
        aria-label="Italic"
      >
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="strikethrough"
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="bg-mauve6 mx-[10px] w-[1px]" />
    <Toolbar.ToggleGroup
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="left"
        aria-label="Left aligned"
      >
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="center"
        aria-label="Center aligned"
      >
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px]"
        value="right"
        aria-label="Right aligned"
      >
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="bg-mauve6 mx-[10px] w-[1px]" />
    <Toolbar.Link
      className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent focus:relative focus:shadow-[0_0_0_2px]"
      href="#"
      target="_blank"
      style={{ marginRight: 10 }}
    >
      Edited 2 hours ago
    </Toolbar.Link>
    <Toolbar.Button
      className="bg-violet9 hover:bg-violet10 focus:shadow-violet7 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded px-[10px] text-[13px] leading-none text-white outline-none focus:relative focus:shadow-[0_0_0_2px]"
      style={{ marginLeft: "auto" }}
    >
      Share
    </Toolbar.Button>
  </Toolbar.Root>
);

export default ToolbarComponent;
