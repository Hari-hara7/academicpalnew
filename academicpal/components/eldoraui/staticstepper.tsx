"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const StaticStep = ({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex gap-6">
      {/* Step Indicator */}
      <div className="flex flex-col items-center">
        <p className="flex size-8 sm:size-10 flex-none select-none items-center justify-center rounded-full border border-white/30 bg-black text-sm font-semibold text-white">
          {step}
        </p>
        <div className="relative my-2 h-full w-px rounded-full bg-white/20" />
      </div>

      {/* Title and Content */}
      <div className="mb-4 w-full">
        <h6 className="mb-4 ml-1 text-base sm:text-lg font-semibold tracking-tight text-white">
          {title}
        </h6>
        {children}
      </div>
    </div>
  );
};

export const CodeContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-fit w-full rounded-lg border border-white/20 bg-black px-5 py-3 backdrop-blur-sm transition-colors duration-300 hover:bg-white/5">
      <code
        className={cn(
          "whitespace-pre-wrap text-sm text-gray-300 font-mono",
        )}
      >
        {children}
      </code>
    </div>
  );
};
