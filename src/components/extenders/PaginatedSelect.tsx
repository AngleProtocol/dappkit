import * as Popover from "@radix-ui/react-popover";
import { useCallback, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useTheme } from "../../context/Theme.context";
import { mergeClass } from "../../utils/css";
import type { GetSet, Variant } from "../../utils/types";
import Box from "../primitives/Box";
import EventBlocker from "../primitives/EventBlocker";
import Icon from "../primitives/Icon";
import InfiniteScroll from "../primitives/InfiniteScroll";
import Input from "../primitives/Input";
import Text from "../primitives/Text";
import Group from "./Group";
import { blockEvent } from "../../utils/event";

const selectStyles = tv({
  base: [
    "rounded-sm ease flex items-center focus-visible:outline-main-12 !leading-none justify-between text-nowrap font-text font-normal",
  ],
  slots: {
    dropdown:
      "outline-0 z-50 origin-top animate-drop animate-stretch mt-sm min-w-[var(--popover-anchor-width)]",
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


type SelectProps<T> = {
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  options: { [key in string | number | symbol]: React.ReactNode };
  defaultValue?: T | T[];
  placeholder?: string;
  className?: string;
  loading?: boolean;
  multiple?: boolean;
  onNext?: (release: () => void) => Promise<void> | void;
  onSearch?: (search: string) => Promise<void>;
  state: GetSet<T | T[] | undefined>;
};

export default function PaginatedSelect<T extends string | number>({
  options,
  defaultValue,
  placeholder = "Select...",
  look,
  size,
  className,
  state,
  loading,
  multiple = false,
  onNext,
  onSearch,
}: SelectProps<T>) {
  const {
    base,
    item,
    value: valueStyle,
  } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  const [_isOpenSelect, setIsOpenSelect] = useState(false);
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(
    defaultValue
  );
  const selectedValue = state ? state[0] : internalValue;
  const setSelectedValue = state ? state[1] : setInternalValue;

  const handleSelect = (val: T) => {
    if (multiple) {
      const selected = Array.isArray(selectedValue) ? selectedValue : [];
      const alreadySelected = selected.includes(val);
      const newValue = alreadySelected
        ? selected.filter((v) => v !== val)
        : [...selected, val];
      setSelectedValue(newValue);
    } else {
      setIsOpenSelect(false);
      setSelectedValue(val);
    }
  };

  const selectedLabel = (() => {
    if (multiple && Array.isArray(selectedValue)) {
      return selectedValue.length === 0
        ? placeholder
        : `${selectedValue.length} option${
            selectedValue.length > 1 ? "s" : ""
          } selected`;
    }

    if (!multiple && selectedValue !== undefined) {
      return options[selectedValue as keyof typeof options];
    }

    return placeholder;
  })();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      setIsOpenSelect(false);
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

  const [search, setSearch] = useState<string>("");

  const onSearchChange = useCallback(
    (search: string | undefined) => {
      onSearch?.(search);
      setSearch(search);
    },
    [onSearch]
  );


  /*
   */
  const { vars } = useTheme();
  const [internalState, setInternalState] = useState<boolean>(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    if (!hideTimeout.current) return;
    clearTimeout(hideTimeout.current);
  }, []);

  const toggle = useCallback(
    () =>
      blockEvent(() => {
        setInternalState(!internalState);
      }),
    [internalState, state]
  );

  return (
    <EventBlocker className="w-full">
      <Popover.Root
        open={internalState}
        onOpenChange={(o) => {
          return setInternalState(o);
        }}
      >
        <Popover.Trigger className={className} onClick={toggle}>
          {
            <Group className={mergeClass(base(), "w-full")}>
              <Text className={valueStyle()}>
                {selectedLabel ?? placeholder}
              </Text>
              <Group>
                {loading ? (
                  <Icon className="animate-spin" remix="RiLoader4Fill" />
                ) : (
                  <Icon remix="RiArrowDropDownLine" />
                )}
              </Group>
            </Group>
          }
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="!pointer-events-auto w-[var(--radix-popover-trigger-width)]"
            asChild
            style={vars}
          >
            <EventBlocker>
              <Box
                look="bold"
                className="mt-md shadow-md animate-drop z-20"
              >
                {
                  <InfiniteScroll onNext={onNext}>
                    <div className="max-h-[245px] overflow-y-auto w-full">
                      <Input
                        placeholder="Search..."
                        state={[search, onSearchChange]}
                        className="w-full"
                      />
                      {Object.entries(options).map(([key, node]) => (
                        <Group
                          key={key}
                          onClick={() => handleSelect(key as T)}
                          className={mergeClass(item(),
                            "cursor-pointer justify-start w-full !truncate",
                            isSelected(key as T) && "bg-main-3"
                          )}
                          size="md"
                        >
                          {node}
                        </Group>
                      ))}
                    </div>
                  </InfiniteScroll>
                }
              </Box>
            </EventBlocker>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </EventBlocker>
  );
}