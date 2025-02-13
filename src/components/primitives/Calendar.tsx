"use client";
import * as React from "react";
import { DayPicker, type DropdownProps } from "react-day-picker";
import Select from "../extenders/Select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type IProps = {
  state: {
    state: Date | undefined;
    setter: React.Dispatch<React.SetStateAction<Date | undefined>>;
  };
} & CalendarProps;

const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const YEARS = {
  2020: "2020",
  2021: "2021",
  2022: "2022",
  2023: "2023",
  2024: "2024",
  2025: "2025",
};

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: IProps) {
  const { state, setter } = props.state;
  const [internalMonth, setInternalMonth] = React.useState(state?.getMonth() ?? 0);

  React.useEffect(() => {
    if (!state) return;
    setInternalMonth(state.getMonth());
  }, [state]);

  return (
    <DayPicker
      mode="single"
      selected={state}
      onSelect={setter}
      defaultMonth={state}
      timeZone="UTC"
      classNames={{
        months: "text-main-11 flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer",
        selected: "text-accent-12 bg-main-6",
      }}
      components={{
        MonthsDropdown: ({ onChange }: DropdownProps) => {
          const handleChange = (value: React.FormEvent<HTMLDivElement>) => {
            const changeEvent = {
              target: { value },
            } as unknown as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              state={[internalMonth, month => setInternalMonth(month)]}
              onChange={handleChange}
              options={MONTHS}
            />
          );
        },
        YearsDropdown: ({ onChange }: DropdownProps) => {
          const handleChange = (value: React.FormEvent<HTMLDivElement>) => {
            const changeEvent = {
              target: { value },
            } as unknown as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select
              state={[state?.getFullYear(), year => setter(new Date(year, internalMonth))]}
              onChange={handleChange}
              options={YEARS}
            />
          );
        },
      }}
      hideNavigation={true}
      captionLayout="dropdown"
    />
  );
}
