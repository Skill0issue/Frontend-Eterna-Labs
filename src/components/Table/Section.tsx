import type { Token } from "@/types/token";
import TokenRow from "./TokenRow";
import { TableSkeleton } from "./TableSkeleton";

interface sectionProps {
  title: string;
  tokens: Token[] | undefined;
  loading: boolean;
}

export default function Section(props: sectionProps) {
  return (
    <div
      className="w-full flex flex-col 
        h-[calc(100vh-160px)]    /* MOBILE height */
        sm:h-[calc(100vh-170px)]
        lg:h-[calc(100vh-190px)]  /* DESKTOP height */
        xl:h-[calc(100vh-200px)]
      "
    >
      <h2 className="px-2 py-1 text-xl font-semibold text-white">
        {props.title}
      </h2>

      {props.loading ? (
        <TableSkeleton />
      ) : (
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {props.tokens?.map((tok) => (
            <TokenRow key={tok.id} token={tok} />
          ))}
        </div>
      )}
    </div>
  );
}
