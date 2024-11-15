import { mergeClass } from "dappkit/src";
import type { Component, Styled } from "dappkit/src";
import {
  type PropsWithChildren,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { tv } from "tailwind-variants";
import Box from "./Box";
import Icon from "./Icon";
import List from "./List";
import Text from "./Text";
import EventBlocker from "./EventBlocker";

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
    compactSize?: string;
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
      exclude?: (keyof T)[];
    } & TableColumns<T>
  >
>;

export function Row<T extends Columns>({
  columns,
  exclude,
  children,
  ...props
}: RowProps<T>) {
  const isScreenSmall = useMediaQuery({ maxWidth: 600 });
  const [ids, grid, compact] = useMemo(() => {
    const cols = Object.keys(columns ?? {}) as (keyof T)[];
    const style: {
      display: "grid";
      gridTemplateColumns: string;
      rowGap: string;
    } = {
      display: "grid",
      rowGap: "0px",
      gridTemplateColumns: cols
        .map((id) => {
          if (exclude?.includes(id)) return;
          return columns?.[id]?.size ?? "1fr";
        })
        .join(" ") as string,
    };
    const compactStyle: { display: "grid"; gridTemplateColumns: string } = {
      display: "grid",
      gridTemplateColumns: cols
        .filter((id) => !columns?.[id]?.main)
        .map((id) => columns?.[id]?.compactSize ?? "1fr")
        .join(" "),
    };

    return [cols, style, compactStyle];
  }, [columns, exclude]);

  const divProps = { ...props };
  for (const id of ids) {
    Object.keys(divProps)?.includes(`${String(id)}Column`) &&
      delete divProps[`${String(id)}Column` as keyof typeof divProps];
  }

  // TODO: add headers to wrapped table when isScreenSmall
  // const headers = useHeaders(columns);

  return (
    <Box style={isScreenSmall ? compact : grid} {...divProps}>
      {ids?.map((id) => {
        const element = props[
          `${String(id)}Column` as keyof typeof props
        ] as ReactNode;
        const { className, main } = columns[id];

        if (exclude?.includes(id)) return;

        return (
          <div
            style={
              main && isScreenSmall
                ? {
                    gridColumn: `span ${ids?.length - 1} / span ${
                      ids?.length - 1
                    }`,
                  }
                : {}
            }
            key={String(id)}
            className={[className, "inline-flex items-center"].join(" ")}
          >
            {element}
          </div>
        );
      })}
      {children && (
        <EventBlocker style={{ gridColumn: "1 / -1" }}>{children}</EventBlocker>
      )}
    </Box>
  );
}

export type TableProps<T extends Columns> = Component<
  Styled<typeof tableStyles> & {
    columns: T;
    header?: ReactNode;
    footer?: ReactNode;
    order?: Order;
    sort?: keyof T;
    loading?: boolean;
    sortable?: (keyof T)[];
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
  props?: TableHeaders<T>
) {
  return useMemo(() => {
    const ids = Object.keys(columns ?? {});
    const head: Partial<TableColumns<T>> = {};

    for (const id of ids) {
      const { name: title, className } = columns[id];
      const isSortable = sortable?.includes(id);
      const handler =
        title && isSortable ? () => onHeaderClick?.(id) : undefined;

      head[`${id}Column` as keyof TableColumns<T>] = (
        <Text
          className="relative font-mulish"
          size="xs"
          interactable={isSortable}
          onKeyDown={handler}
          onClick={handler}
        >
          {props?.[`${id}Header` as keyof TableHeaders<T>] ?? title}
          <span className="absolute -right-5">
            {sortable &&
              id === sortBy &&
              (order === "desc" ? (
                <Icon size="sm" remix={"RiArrowDropDownLine"} />
              ) : (
                <Icon size="sm" remix={"RiArrowDropUpLine"} />
              ))}
          </span>
        </Text>
      );
    }
    return head as {
      [C in keyof TableColumns<Columns>]: ReactNode;
    };
  }, [columns, onHeaderClick, sortBy, order]);
}

export function Table<T extends Columns>({
  look,
  sortable,
  columns,
  header,
  order,
  sort,
  onSort,
  className,
  children,
  ...props
}: TableProps<T>) {
  const isScreenSmall = useMediaQuery({ maxWidth: 600 });
  const [_order, setOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof T | undefined>(sortable?.[0]);

  function onHeaderClick(id: keyof T) {
    const currentOrder =
      id !== sortBy ? "desc" : _order === "desc" ? "asc" : "desc";

    setOrder(currentOrder);
    setSortBy(id);
    onSort?.(id, currentOrder);
  }

  const headers = useHeaders(
    columns,
    sortable,
    onHeaderClick,
    sort ?? sortBy,
    order ?? _order,
    props
  );

  return (
    <List
      indexOffset={header ? 0 : 1}
      className={mergeClass(className)}
      look={look}
      {...props}
    >
      {!!header ? <Box className="bg-auto">{header}</Box> : undefined}
      <Row columns={columns} {...headers} />
      {children}
    </List>
  );
}

export function createTable<T extends Columns>(columns: T) {
  const TemplateTable = (props: Omit<TableProps<T>, "columns">) => (
    <Table {...props} columns={columns} />
  );

  const TemplateRow = (props: Omit<RowProps<T>, "columns">) => (
    <Row {...props} columns={columns} />
  );

  return [TemplateTable, TemplateRow, Object.keys(columns)] as [
    typeof TemplateTable,
    typeof TemplateRow,
    (keyof T)[]
  ];
}
