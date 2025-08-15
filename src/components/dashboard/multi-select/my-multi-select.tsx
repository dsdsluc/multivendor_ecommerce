import React, { useMemo } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useTheme } from "next-themes";

interface CountryOption {
  label: string;
  value: string;
  id?: string;
}

interface Props {
  options: CountryOption[];
  value: CountryOption[];
  onChange: (selected: CountryOption[]) => void;
  labelledBy?: string;
}

export default function MyMultiSelect({
  options,
  value,
  onChange,
  labelledBy = "Select",
}: Props) {
  const { theme } = useTheme();

  const className = useMemo(() => {
    return theme === "dark"
      ? "bg-gray-900 text-gray-200 border border-gray-700 rounded-md shadow-md"
      : "bg-gray-50 text-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500";
  }, [theme]);

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={onChange}
      labelledBy={labelledBy}
      className={className}
    />
  );
}
