"use client";

import React, { useState } from "react";
import { useTokens } from "@/queries/tokens";
import Section from "@/components/Table/Section";
import MainHeader from "./MainHeader";

const TokenTable = () => {
  const { data: newPairs, isLoading: isPairsLoading } = useTokens("New pairs");
  const { data: finalStretch, isLoading: isFinalLoading } =
    useTokens("Final Stretch");
  const { data: migrated, isLoading: isMigratedLoading } =
    useTokens("Migrated");

  const [selected, setSelected] = useState("New pairs");

  const currentTokens =
    selected === "New pairs"
      ? newPairs
      : selected === "Final Stretch"
      ? finalStretch
      : migrated;

  const currentLoading =
    selected === "New pairs"
      ? isPairsLoading
      : selected === "Final Stretch"
      ? isFinalLoading
      : isMigratedLoading;

  return (
    <div className="flex flex-col items-center w-full py-4">
      <MainHeader />

      {/* DESKTOP */}
      <div className="hidden w-full px-6 xl:flex">
        <Section
          title="New Pairs"
          tokens={newPairs}
          loading={isPairsLoading}
          selected={selected}
          onSelect={setSelected}
        />
        <Section
          title="Final Stretch"
          tokens={finalStretch}
          loading={isFinalLoading}
          selected={selected}
          onSelect={setSelected}
        />
        <Section
          title="Migrated"
          tokens={migrated}
          loading={isMigratedLoading}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* MOBILE */}
      <div className="w-full px-4 xl:hidden">
        <Section
          title={selected}
          tokens={currentTokens}
          loading={currentLoading}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
};

export default TokenTable;
