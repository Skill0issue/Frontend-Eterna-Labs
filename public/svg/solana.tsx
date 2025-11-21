import { SVGProps } from "react";

export function SolLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="none">
        <path
          fill="url(#sol0)"
          d="M19.125 7.447a.7.7 0 0 1-.456.18H2.644c-.569 0-.856-.65-.462-1.03l2.632-2.538a.67.67 0 0 1 .455-.188h16.088c.574 0 .855.656.456 1.038z"
        />
        <path
          fill="url(#sol1)"
          d="M19.125 19.954a.7.7 0 0 1-.456.175H2.644c-.569 0-.856-.645-.462-1.026l2.632-2.544a.66.66 0 0 1 .455-.181h16.088c.574 0 .855.65.456 1.03z"
        />
        <path
          fill="url(#sol2)"
          d="M19.125 10.303a.7.7 0 0 0-.456-.175H2.644c-.569 0-.856.645-.462 1.025l2.632 2.545a.7.7 0 0 0 .455.18h16.088c.574 0 .855-.65.456-1.03z"
        />

        <defs>
          <linearGradient id="sol0" x1="2" x2="22.5" y1="59.8" y2="59.6">
            <stop stopColor="#599DB0" />
            <stop offset="1" stopColor="#47F8C3" />
          </linearGradient>
          <linearGradient id="sol1" x1="2" x2="22.3" y1="8.8" y2="8.7">
            <stop stopColor="#C44FE2" />
            <stop offset="1" stopColor="#73B0D0" />
          </linearGradient>
          <linearGradient id="sol2" x1="3.1" x2="21.2" y1="12" y2="12">
            <stop stopColor="#778CBF" />
            <stop offset="1" stopColor="#5DCDC9" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
