// components/Select.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useCall } from "wagmi";
import { mergeClass } from "../../utils/css";
import type { Variant } from "../../utils/types";
import Button from "../primitives/Button";
import Icon from "../primitives/Icon";
import InfiniteScroll from "../primitives/InfiniteScroll";
import Text from "../primitives/Text";
import Dropdown from "./Dropdown";
import Group from "./Group";

const selectStyles = tv({
  base: [
    "rounded-sm ease flex items-center focus-visible:outline-main-12 !leading-none justify-between text-nowrap font-text font-normal",
  ],
  slots: {
    dropdown: "outline-0 z-50 origin-top animate-drop animate-stretch mt-sm min-w-[var(--popover-anchor-width)]",
    item: "rounded-sm flex justify-between items-center gap-md cursor-pointer select-none p-sm outline-offset-0 outline-0 text-nowrap focus-visible:outline-main-12",
    icon: "flex items-center",
    value: "flex gap-sm items-center",
    check: "",
    prefixLabel: "",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 text-main-11 border-1 border-main-0 hover:text-main-12 active:border-main-11",
        icon: "border-main-0",
        item: "font-text hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
      },
      base: {
        base: "bg-main-0 text-main-11 border-1 border-main-9 hover:text-main-12 active:border-main-11",
        icon: "border-main-0",
        item: "font-text hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
      },
      bold: {
        base: "bg-main-1 text-main-11 border-1 border-main-0 hover:text-main-12 active:border-main-8",
        icon: "",
        item: "font-text hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12",
        check: "text-accent-10",
      },
      tint: {
        base: "bg-main-5 text-main-11 border-1 border-main-0 hover:text-main-12 active:border-main-8",
        icon: "",
        item: "font-text hover:bg-main-3 data-[active-item]:bg-main-6 active:bg-main-5 text-main-12",
      },
      hype: {
        base: "bg-main-8 text-main-12 border-1 border-main-0 hover:bg-main-10 active:border-stroke-11",
        icon: "",
        item: "font-text hover:bg-accent-3 data-[active-item]:bg-accent-3 active:bg-accent-4 text-main-12",
      },
    },
    size: {
      xs: {
        base: "text-xs",
        value: "px-sm*2 py-xs*2",
        icon: "text-sm",
        item: "px-md text-xs",
        prefixLabel: "text-xs",
      },
      sm: {
        base: "text-sm",
        value: "px-md py-sm",
        icon: "text-base",
        item: "px-md text-sm",
        prefixLabel: "text-sm",
      },
      md: {
        base: "text-md",
        value: "px-md text-md py-md",
        icon: "text-lg",
        item: "px-md text-md",
        prefixLabel: "text-sm",
      },
      lg: {
        base: "text-lg",
        value: "px-xl/2 py-lg",
        icon: "text-xl",
        item: "px-lg text-lg",
        prefixLabel: "text-base",
      },
      xl: {
        base: "text-xl",
        value: "px-sm*2 py-lg",
        icon: "text-xl",
        item: "px-xl text-xl",
        prefixLabel: "text-lg",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
  compoundVariants: [
    {
      size: "xs",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "sm",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "md",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-sm/2" },
    },
    {
      size: "lg",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-md/2" },
    },
    {
      size: "xl",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-lg/2" },
    },
  ],
});

// type Option<T> = {
//   label: string;
//   value: T;
// };

type SelectProps<T> = {
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  options: { [key in string | number | symbol]: React.ReactNode };
  value?: T | T[];
  defaultValue?: T | T[];
  placeholder?: string;
  onChange?: (value: any) => void;
  className?: string;
  loading?: boolean;
  multiple?: boolean;
  onNext?: (release: () => void) => Promise<void> | void;
};

export default function PaginatedSelect<T extends string | number>({
  options,
  value,
  defaultValue,
  placeholder = "Select...",
  look,
  size,
  className,
  loading,
  multiple = false,
  onNext,
  onChange,
}: SelectProps<T>) {
  const {
    base,
    dropdown,
    item,
    icon,
    value: valueStyle,
  } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const handleSelect = (val: T) => {
    if (multiple) {
      const selected = Array.isArray(selectedValue) ? selectedValue : [];
      const alreadySelected = selected.includes(val);
      const newValue = alreadySelected ? selected.filter(v => v !== val) : [...selected, val];

      onChange?.(newValue);
      setInternalValue(newValue);
    } else {
      onChange?.(val);
      setInternalValue(val);
      setIsOpen(false);
    }
  };

  const selectedLabel = (() => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.length === 0
        ? placeholder
        : `${selectedValue.length} option${selectedValue.length > 1 ? "s" : ""} selected`;
    }

    if (!multiple && selectedValue !== undefined) {
      return options[selectedValue as keyof typeof options];
    }

    return placeholder;
  })();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSelected = (key: T) => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.includes(key);
    }
    return selectedValue === key;
  };

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), [isOpen]);

  return (
    <Dropdown
      content={
        <InfiniteScroll onNext={onNext}>
          <div className="max-h-[300px] overflow-y-auto">
            {Object.entries(options).map(([key, node]) => (
              <Group
                key={key}
                onClick={() => handleSelect(key as T)}
                className={mergeClass(
                  item(),
                  "cursor-pointer justify-start w-full",
                  isSelected(key as T) && "bg-main-3",
                )}
                size="md">
                {node}
              </Group>
            ))}
          </div>
        </InfiniteScroll>
      }>
      <Group onClick={toggleOpen} className={mergeClass(base(), "w-full")}>
        <Text className={valueStyle()}>{selectedLabel}</Text>
        <Group className={valueStyle()}>
          {loading ? <Icon className="animate-spin" remix="RiLoader4Fill" /> : <Icon remix="RiArrowDropDownLine" />}
        </Group>
      </Group>
    </Dropdown>
  );
}
// <div ref={selectRef} className={`relative ${className}`}>
//   <button type={"button"} onClick={() => setIsOpen(prev => !prev)} className={mergeClass(base(), "w-full")}>
//     <span className={valueStyle()}>{selectedLabel}</span>
//     <div className={valueStyle()}>
//       {loading ? <Icon className="animate-spin" remix="RiLoader4Fill" /> : <Icon remix="RiArrowDropDownLine" />}
//     </div>
//   </button>

//   {isOpen && (
//     <InfiniteScroll onNext={onNext}>
//       <div
//         className={mergeClass(
//           dropdown(),
//           "w-full bg-main-1 absolute z-50 p-[2px] border-1 border-main-7 rounded-sm max-h-[150px] overflow-y-auto custom-scrollbar",
//         )}>
//         <Group className={mergeClass(dropdown(), "bg-main-1 flex-col w-full mt-1 overflow-auto !m-0")} size="xs">
//           {Object.entries(options).map(([key, node]) => (
//             <Group
//               key={key}
//               onClick={() => handleSelect(key as T)}
//               className={mergeClass(
//                 item(),
//                 "cursor-pointer justify-start w-full",
//                 isSelected(key as T) && "bg-main-3",
//               )}
//               size="md">
//               {node}
//             </Group>
//           ))}
//         </Group>
//       </div>
//     </InfiniteScroll>
//   )}
// </div>

// );
// return (
//   <div ref={selectRef} className={`relative ${className}`}>
//     <button type={"button"} onClick={() => setIsOpen(prev => !prev)} className={mergeClass(base(), "w-full")}>
//       <span className={valueStyle()}>{selectedLabel}</span>
//       <div className={valueStyle()}>
//         {loading ? <Icon className="animate-spin" remix="RiLoader4Fill" /> : <Icon remix="RiArrowDropDownLine" />}
//       </div>
//     </button>

//     {isOpen && (
//       <InfiniteScroll onNext={onNext}>
//         <div
//           className={mergeClass(
//             dropdown(),
//             "w-full bg-main-1 absolute z-50 p-[2px] border-1 border-main-7 rounded-sm max-h-[150px] overflow-y-auto custom-scrollbar",
//           )}>
//           <Group className={mergeClass(dropdown(), "bg-main-1 flex-col w-full mt-1 overflow-auto !m-0")} size="xs">
//             {Object.entries(options).map(([key, node]) => (
//               <Group
//                 key={key}
//                 onClick={() => handleSelect(key as T)}
//                 className={mergeClass(
//                   item(),
//                   "cursor-pointer justify-start w-full",
//                   isSelected(key as T) && "bg-main-3",
//                 )}
//                 size="md">
//                 {node}
//               </Group>
//             ))}
//           </Group>
//         </div>
//       </InfiniteScroll>
//     )}
//   </div>
// );
