"use client";

import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

interface SegmentedProps {
  value: string;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Segmented({
  value,
  onValueChange,
  children,
  className,
}: SegmentedProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v)}
      className={cn(
        "inline-flex items-center rounded-full bg-secondary border border-white/10 p-[4px] h-9",
        className
      )}
    >
      {children}
    </ToggleGroup.Root>
  );
}

interface SegmentedItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function SegmentedItem({ value, children, className }: SegmentedItemProps) {
  return (
    <ToggleGroup.Item
      value={value}
      className={cn(
        "px-3 py-1 text-sm rounded-full transition-colors",
        "data-[state=on]:bg-primaryBlue/20 data-[state=on]:text-white",
        "data-[state=off]:text-white/70 hover:text-white",
        className
      )}
    >
      {children}
    </ToggleGroup.Item>
  );
}
