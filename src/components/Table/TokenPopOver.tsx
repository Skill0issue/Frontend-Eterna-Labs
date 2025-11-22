import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

export function TokenPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 rounded hover:bg-white/5">
          <MoreHorizontal size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="end"
        className="w-40 p-2 text-sm border rounded-md bg-secondary border-border"
      >
        <button className="w-full px-2 py-1 text-left rounded hover:bg-secondary/60">
          View Chart
        </button>
        <button className="w-full px-2 py-1 text-left rounded hover:bg-secondary/60">
          Copy Contract
        </button>
        <button className="w-full px-2 py-1 text-left rounded hover:bg-secondary/60">
          Open Explorer
        </button>
      </PopoverContent>
    </Popover>
  );
}
