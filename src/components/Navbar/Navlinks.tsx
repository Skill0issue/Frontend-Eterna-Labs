import Link from "next/link";
import React from "react";

type Props = {};

const Navlinks = (props: Props) => {
  const links = [
    { name: "Discover", href: "/Discover" },
    { name: "Pulse", href: "/Pulse" },
    { name: "Trackers", href: "/Trackers" },
    { name: "Perpetuals", href: "/Perpetuals" },
    { name: "Yield", href: "/Yield" },
    { name: "Vision", href: "/vision" },
    { name: "Portfolio", href: "/Portfolio" },
    { name: "Rewards", href: "/Rewards" },
  ];

  return (
    <>
      <section>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="mx-4 text-lg font-medium text-gray-700 hover:text-gray-900"
          >
            {link.name}
          </Link>
        ))}
      </section>
    </>
  );
};

export default Navlinks;
