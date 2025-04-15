import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import useDebounce from "../../hooks/useDebounce";
import { mergeClass } from "../../utils/css";
import type { GetSet, Variant } from "../../utils/types";
import Icon from "../primitives/Icon";
import InfiniteScroll, { type InfiniteScrollRef } from "../primitives/InfiniteScroll";
import Input from "../primitives/Input";
import Text from "../primitives/Text";
import Group from "./Group";
import Modal from "./Modal";

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

type SelectProps = {
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  options: { [key in string | number | symbol]: React.ReactNode };
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  onNext?: (release: () => void) => Promise<void> | void;
  onSearch?: (search: string, release?: () => void) => Promise<void>;
  state: GetSet<string | undefined>;
  prefix?: React.ReactNode;
  error?: ReactNode;
};

export default function PaginatedSelect({
  options: optionMap,
  placeholder = "Select...",
  look,
  size,
  className,
  state,
  loading,
  onNext,
  onSearch: onSearchProps,
  prefix,
  error,
}: SelectProps) {
  const { base, value: valueStyle } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedValue, setSelectedValue] = state;

  const handleSelect = useCallback(
    (key: string) => {
      setIsModalOpen(false);
      setSelectedValue(key);
    },
    [setSelectedValue],
  );

  const isSelected = useCallback(
    (key: string) => {
      return selectedValue === key;
    },
    [selectedValue],
  );

  const onSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  useEffect(() => {
    onSearchProps?.(debouncedSearch);
  }, [debouncedSearch, onSearchProps]);

  const selectedValueDisplay = useMemo(() => {
    if (!selectedValue) return;
    return <Group>{optionMap[selectedValue]}</Group>;
  }, [selectedValue, optionMap]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderOptions = useMemo(() => {
    const options = Object.entries(optionMap);
    if (!options.length) {
      const baseText = !!debouncedSearch ? "No result found for " : "No result found ";
      return (
        <Text look="soft" className="block text-center mt-lg">
          {baseText}
          <Text look="bold" bold>
            {debouncedSearch}
          </Text>
        </Text>
      );
    }
    return options.map(([key, node]) => (
      <Group
        key={key}
        onClick={() => handleSelect(key)}
        className={mergeClass(
          "cursor-pointer justify-start w-full py-lg px-xl hover:bg-main-5",
          isSelected(key) && "bg-main-3",
        )}
        size="md">
        {node}
      </Group>
    ));
  }, [optionMap, debouncedSearch, handleSelect, isSelected]);

  const scrollRef = useRef<InfiniteScrollRef>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We release the infinite scroll when new debounced search is made
  useEffect(() => {
    scrollRef.current?.release();
  }, [debouncedSearch]);

  const toggleModal = useCallback(() => setIsModalOpenWrapper(!isModalOpen), [isModalOpen]);

  const setIsModalOpenWrapper = useCallback((bool: boolean) => {
    setSearch("");
    setIsModalOpen(bool);
  }, []);
  return (
    <>
      <Modal
        state={[isModalOpen, setIsModalOpenWrapper]}
        title={<Text look="bold">Select a token</Text>}
        modal={
          <Group className={mergeClass("h-[65vh] overflow-y-hidden")}>
            <Input
              type={"string"}
              state={[search, onSearch]}
              placeholder={"Search a token"}
              className="w-full h-[fit-content]"
              size="lg"
              prefix={<Icon remix="RiSearch2Line" />}
            />
            <InfiniteScroll onNext={onNext} ref={scrollRef}>
              <div className="overflow-y-auto w-full h-full">{renderOptions}</div>
            </InfiniteScroll>
          </Group>
        }
      />
      <Group className={mergeClass("w-full", className)}>
        <Group className={mergeClass(base(), "w-full h-[58px]")} onClick={toggleModal}>
          <Group className={valueStyle()}>
            {!selectedValueDisplay && <Group>{prefix}</Group>}
            <Text>{selectedValueDisplay ?? placeholder}</Text>
          </Group>
          <Group>{loading && <Icon className="animate-spin" remix="RiLoader4Fill" />}</Group>
        </Group>
        {error}
      </Group>
    </>
  );
}
