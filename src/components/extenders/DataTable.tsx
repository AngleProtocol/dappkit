import { createTable } from "../primitives/Table";

export const [DataTable, DataRow, DataColumns] = createTable({
  label: {
    name: "Label",
    size: "1fr",
    className: "justify-start",
    main: true,
  },
  value: {
    name: "Value",
    size: "1fr",
    className: "justify-end",
  },
});
