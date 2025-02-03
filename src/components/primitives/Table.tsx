import { type PropsWithChildren, type ReactNode, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { mergeClass } from "../../utils/css";
import type { Component, Styled } from "../../utils/types";
import Box from "./Box";
import EventBlocker from "./EventBlocker";
import Icon from "./Icon";
import List, { type ListProps } from "./List";
import Text from "./Text";

export const tableStyles = tv({
  base: "",
  slots: {
    table: "",
    row: "",
  },
  variants: {
    look: {
      soft: {
        table: "",
        row: "",
      },
      base: {
        table: "bg-accent-1",
        row: "",
      },
      bold: {
        table: "",
        row: "",
      },
      tint: {
        table: "",
        row: "",
      },
      hype: {
        table: "",
        row: "",
      },
    },
  },
  defaultVariants: {
    look: "base",
  },
});

const orders = ["desc", "asc"] as const;

export type Order = (typeof orders)[number];
export type Columns<C extends string = string> = {
  [id in C]: {
    name: ReactNode;
    size?: string;
    className?: string;
    main?: boolean;
  };
};
export type TableColumns<T extends Columns> = {
  readonly [C in `${Extract<keyof T, string>}Column`]: ReactNode;
};
export type TableHeaders<T extends Columns> = {
  readonly [C in `${Extract<keyof T, string>}Header`]?: ReactNode;
};

export type RowProps<T extends Columns> = Component<
  PropsWithChildren<
    {
      columns: T;
      size?: ListProps["size"];
      exclude?: (keyof T)[];
    } & Partial<TableColumns<T>>
  >
>;

export function Row<T extends Columns>({ columns, exclude, children, ...props }: RowProps<T>) {
  const [ids, grid] = useMemo(() => {
    const cols = Object.keys(columns ?? {}) as (keyof T)[];
    const style: {
      display: "grid";
      gridTemplateColumns: string;
      rowGap: string;
    } = {
      display: "grid",
      rowGap: "0px",
      gridTemplateColumns: cols
        .map(id => {
          if (exclude?.includes(id)) return;
          return columns?.[id]?.size ?? "1fr";
        })
        .join(" ") as string,
    };

    return [cols, style];
  }, [columns, exclude]);

  const divProps = { ...props };
  for (const id of ids) {
    Object.keys(divProps)?.includes(`${String(id)}Column`) &&
      delete divProps[`${String(id)}Column` as keyof typeof divProps];
  }

  // TODO: add headers to wrapped table when isScreenSmall
  // const headers = useHeaders(columns);

  return (
    <Box style={grid} className="whitespace-nowrap" {...divProps}>
      {ids?.map(id => {
        const element = props[`${String(id)}Column` as keyof typeof props] as ReactNode;
        const { className } = columns[id];

        if (exclude?.includes(id)) return;

        return (
          <div
            key={String(id)}
            className={[className, "inline-flex items-center overflow-hidden text-ellipsis"].join(" ")}>
            {element}
          </div>
        );
      })}
      {children && <EventBlocker style={{ gridColumn: "1 / -1" }}>{children}</EventBlocker>}
    </Box>
  );
}

export type TableProps<T extends Columns> = Component<
  Styled<typeof tableStyles> & {
    columns: T;
    exclude?: (keyof T)[];
    header?: ReactNode;
    footer?: ReactNode;
    responsive?: boolean;
    order?: Order;
    hideLabels?: boolean;
    sort?: keyof T;
    loading?: boolean;
    sortable?: (keyof T)[];
    className?: string;
    children?: PropsWithChildren["children"];
    onSort?: (id: keyof T, order: Order) => void;
  } & TableHeaders<T>,
  HTMLDivElement
>;

export function useHeaders<T extends Columns>(
  columns: T,
  sortable?: (keyof T)[],
  onHeaderClick?: (id: keyof T) => void,
  sortBy?: keyof T,
  order?: Order,
  props?: TableHeaders<T>,
) {
  //TODO: assess if props needs to be updated for columns and how to memo all columns
  // biome-ignore lint/correctness/useExhaustiveDependencies: props in dependency would render the memo useless
  return useMemo(() => {
    const ids = Object.keys(columns ?? {});
    const head: Partial<TableColumns<T>> = {};

    for (const id of ids) {
      const { name: title, className: _className } = columns[id];
      const isSortable = sortable?.includes(id);
      const handler = title && isSortable ? () => onHeaderClick?.(id) : undefined;

      head[`${id}Column` as keyof TableColumns<T>] = (
        <Text className="relative font-text" size="md" interactable={isSortable} onKeyDown={handler} onClick={handler}>
          {props?.[`${id}Header` as keyof TableHeaders<T>] ?? title}
          <span className="absolute -right-5 top-1/2 -translate-y-1/2">
            {sortable &&
              id === sortBy &&
              (order === "desc" ? <Icon remix={"RiArrowDropDownLine"} /> : <Icon remix={"RiArrowDropUpLine"} />)}
          </span>
        </Text>
      );
    }
    return head as {
      [C in keyof TableColumns<Columns>]: ReactNode;
    };
  }, [columns, onHeaderClick, sortBy, order, sortable]);
}

export function Table<T extends Columns>({
  look,
  sortable,
  columns,
  header,
  footer,
  order,
  hideLabels,
  sort,
  responsive = false,
  onSort,
  className,
  children,
  ...props
}: TableProps<T> & { dividerClassName: ListProps["dividerClassName"] }) {
  const [_order, setOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof T | undefined>(sortable?.[0]);

  function onHeaderClick(id: keyof T) {
    const currentOrder = id !== sortBy ? "desc" : _order === "desc" ? "asc" : "desc";

    setOrder(currentOrder);
    setSortBy(id);
    onSort?.(id, currentOrder);
  }

  // biome-ignore lint/suspicious/noExplicitAny: please forgive this any
  const headers = useHeaders(columns, sortable, onHeaderClick, sort ?? sortBy, order ?? _order, props as any);

  return (
    <List indexOffset={header ? 0 : 1} className={mergeClass(className)} look={look} {...props}>
      {!!header ? <Box className="bg-auto">{header}</Box> : undefined}
      {/* biome-ignore lint/suspicious/noExplicitAny: please forgive this one as well */}
      {!hideLabels ? <Row {...(headers as any)} columns={columns} /> : undefined}
      {children}
      {!!footer ? <Box className="bg-auto">{footer}</Box> : undefined}
    </List>
  );
}

export function createTable<T extends Columns>(columns: T) {
  const TemplateTable = (props: Omit<TableProps<T>, "columns"> & ListProps) =>
    props.responsive ? (
      <div className="w-full overflow-x-visible -mx-lg md:-mx-xl lg:mx-0">
        <div className="min-w-fit lg:w-auto px-lg md:px-xl lg:px-0">
          {/* biome-ignore lint/suspicious/noExplicitAny: no reasons for it to have type errors */}
          <Table size="lg" {...(props as any)} columns={columns} />
        </div>
      </div>
    ) : (
      /* biome-ignore lint/suspicious/noExplicitAny: no reasons for it to have type errors */
      <Table size="lg" {...(props as any)} columns={columns} />
    );

  // biome-ignore lint/suspicious/noExplicitAny: no reasons for it to have type errors
  const TemplateRow = (props: Omit<RowProps<T>, "columns">) => <Row {...(props as any)} columns={columns} />;

  return [TemplateTable, TemplateRow, Object.keys(columns)] as [typeof TemplateTable, typeof TemplateRow, (keyof T)[]];
}
