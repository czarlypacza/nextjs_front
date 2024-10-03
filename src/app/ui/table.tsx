import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  sentence: string;
  pos: number;
  neg: number;
  sentiment: string;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "sentence",
    compare: (a, b) => {
      return a.sentence.localeCompare(b.sentence);
    },
    renderHeaderCell: () => {
      return "Sentence";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.sentence}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "positive",
    compare: (a, b) => {
      return a.pos - b.pos;
    },
    renderHeaderCell: () => {
      return "Positive";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.pos.toString()}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "negative",
    compare: (a, b) => {
      return a.neg - b.neg;
    },
    renderHeaderCell: () => {
      return "Negative";
    },

    renderCell: (item) => {
      return <TableCellLayout>{item.neg.toString()}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "sentiment",
    compare: (a, b) => {
      return a.sentiment.localeCompare(b.sentiment);
    },
    renderHeaderCell: () => {
      return "sentiment";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout >
          {item.sentiment}
        </TableCellLayout>
      );
    },
  }),
];

type TableProps = {
  items: Item[];
};

export const Table = (props:TableProps) => {
  return (
    <DataGrid
      items={props.items}
      columns={columns}
      sortable
      getRowId={(item) => item.sentence}
      focusMode="composite"
      style={{ minWidth: "550px" }}
    >
      <DataGridHeader>
        <DataGridRow
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
