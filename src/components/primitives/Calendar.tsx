"use client";
import * as React from "react";
import { DayPicker, type DropdownProps } from "react-day-picker";
import Select from "../extenders/Select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type IProps = {
  state: {
    state: Date | undefined;
    setter: (date: Date | undefined) => void;
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

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: IProps) {
  const { state, setter } = props.state;

  const currentDate = React.useMemo(() => new Date(), []);
  const [internalMonth, setInternalMonth] = React.useState(state?.getMonth() ?? currentDate.getMonth());

  React.useEffect(() => {
    if (!state) return;
    setInternalMonth(state.getMonth());
  }, [state]);

  return (
    <DayPicker
      mode="single"
      required={false}
      selected={state}
      onSelect={setter}
      defaultMonth={state}
      classNames={{
        months: "text-main-11 flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        day: "p-sm md:p-md bg-main-0 ease text-center hover:bg-main-4 leading-normal aria-selected:opacity-100 cursor-pointer rounded-md",
        selected: "text-main-6 !bg-main-12",
        dropdowns: "flex gap-sm md:gap-md",
        today: "text-main-12 bg-main-4",
      }}
      disabled={{ before: new Date() }}
      styles={{
        day_disabled: { opacity: 0.5 },
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
              state={[state?.getFullYear() ?? currentDate.getFullYear(), year => setter(new Date(year, internalMonth))]}
              onChange={handleChange}
              options={Object.fromEntries(
                Array.from({ length: 20 }, (_, i) => [
                  String(currentDate.getFullYear() + i),
                  String(currentDate.getFullYear() + i),
                ]),
              )}
            />
          );
        },
      }}
      hideNavigation={true}
      captionLayout="dropdown"
    />
  );
}
