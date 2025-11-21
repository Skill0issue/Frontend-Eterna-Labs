import { SVGProps } from "react";

export function EthLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 0L4.63 12.22L12 16.574l7.37-4.354zm0 24L4.63 13.617L12 18l7.37-4.383z"
      />
    </svg>
  );
}
