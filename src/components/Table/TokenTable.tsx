"use client";

import React, { useState } from "react";
import { useTokens } from "@/queries/tokens";
import Section from "@/components/Table/Section";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const TokenTable = () => {
  const { data: newPairs, isLoading: isPairsLoading } = useTokens("New pairs");
  const { data: finalStretch, isLoading: isFinalLoading } =
    useTokens("Final Stretch");
  const { data: migrated, isLoading: isMigratedLoading } = useTokens("Migrated");

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

      {/*  MOBILE TABS  */} 
      <div className="w-full max-w-[500px] lg:hidden px-4 mb-4">
        <Tabs value={selected} onValueChange={setSelected}>
          <TabsList className="grid w-full grid-cols-3 border rounded-md bg-primaryborder-border/40 text-1">
            <TabsTrigger
              value="New pairs"
              className="data-[state=active]:bg-primaryBlue/20"
            >
              New Pairs
            </TabsTrigger>

            <TabsTrigger
              value="Final Stretch"
              className="data-[state=active]:bg-primaryBlue/20"
            >
              Final Stretch
            </TabsTrigger>

            <TabsTrigger
              value="Migrated"
              className="data-[state=active]:bg-primaryBlue/20"
            >
              Migrated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* DESKTOP */}
      <div className="hidden w-full px-6 lg:flex">
        <Section title="New Pairs" tokens={newPairs} loading={isPairsLoading} />
        <Section title="Final Stretch" tokens={finalStretch} loading={isFinalLoading} />
        <Section title="Migrated" tokens={migrated} loading={isMigratedLoading} />
      </div>

    {/* MOBILE */}
      <div className="w-full px-4 lg:hidden ">
        <Section title={selected} tokens={currentTokens} loading={currentLoading} />
      </div>
    </div>
  );
};

export default TokenTable;
