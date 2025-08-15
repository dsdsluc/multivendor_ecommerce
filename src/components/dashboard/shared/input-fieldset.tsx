"use client";

import { FormLabel } from "@/components/ui/form";
import { Dot } from "lucide-react";
import { ReactNode } from "react";

export default function InputFieldset({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <fieldset className="relative border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <legend className="px-2 text-base font-medium text-gray-700 dark:text-gray-200">
          <FormLabel className="text-md">{label}</FormLabel>
        </legend>

        {description && (
          <p className="text-sm text-muted-foreground pb-4 flex items-center gap-1">
            <Dot className="w-4 h-4 text-muted" />
            <span>{description}</span>
          </p>
        )}

        <div className="space-y-4">{children}</div>
      </fieldset>
    </div>
  );
}
