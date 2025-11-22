import React from "react";
import { TokenPopover } from "./TokenPopOver";
import type { Token } from "@/types/token";

type Props = {
  token: Token;
};

const TokenRow = (props: Props) => {
  return (
    <tr className="bg-transparent group hover:bg-hover transistion-all">
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

export default TokenRow;
