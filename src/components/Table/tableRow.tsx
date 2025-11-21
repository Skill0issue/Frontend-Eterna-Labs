import React from "react";
import { TokenPopover } from "./TokenPopOver";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
};

const tableRow = (props: Props) => {
  return (
    <tr className="group hover:bg-hover bg-secondary transistion-all">
      <td id="profile"></td>
      <td id="Market Cap"></td>
      <td id="Liquidity"></td>
      <td id="Volume"></td>
      <td id="TXNS"></td>
      <td id="Token Info"></td>
      <td className="px-3 py-2">
        <TokenPopover token={props.token} />
      </td>
    </tr>
  );
};

export default tableRow;
