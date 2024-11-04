import * as React from "react";
import {
  ArrowLeftFilled,
  ArrowRightFilled,
} from "@fluentui/react-icons";
import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Select,
  useId,
  SelectProps,
  tokens,
  makeStyles,
  TableColumnSizingOptions,
} from "@fluentui/react-components";

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
      return <TableCellLayout>{item.pos.toFixed(2).toString()}</TableCellLayout>;
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
      return <TableCellLayout>{item.neg.toFixed(2).toString()}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "sentiment",
    compare: (a, b) => {
      return a.sentiment.localeCompare(b.sentiment);
    },
    renderHeaderCell: () => {
      return "Sentiment";
    },
    renderCell: (item) => {
      return <TableCellLayout >{item.sentiment}</TableCellLayout>;
    },
  }),
];

const columnSizes:TableColumnSizingOptions = {
  sentence: {
    minWidth:600,
    idealWidth: 800,
    autoFitColumns: true,
  },
  positive: {
    minWidth:80,
    defaultWidth: 60,
  },
  negative: {
    minWidth:80,
    defaultWidth: 60,
  },
  sentiment: {
    minWidth:40,
    defaultWidth: 40,
    idealWidth: 40,
    autoFitColumns: true,
  },
};

const useStyles = makeStyles({
  table: {
    minWidth: "550px",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    boxShadow: tokens.shadow8,
  },
  shadow:{
    boxShadow: tokens.shadow4,
  },
  color:{
    backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
  }

});

type TableProps = {
  items: Item[];
  advanced: boolean;
};

export const Table = (props: TableProps) => {
  // TODO: Add id to the Items array and change the id in the sentence
  const styles = useStyles();

  const result = props.items;
  const [itemsPerPage, setItemsPerPage] = React.useState(5); // Number of items per page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(result.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = result.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const onPageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);

  };

  // Generate page options for the select dropdown
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Select component ID
  const selectId = useId();
  const selectItemsPerPageId = useId();

  // Handle select change
  const onSelectChange: SelectProps["onChange"] = (event, data) => {
    const selectedPage = parseInt(data.value, 10);
    setCurrentPage(selectedPage);
  };

// Handle select change for items per page
const onSelectItemsPerPageChange: SelectProps["onChange"] = (event, data) => {
  const selectedItemsPerPage = parseInt(data.value, 10);
  setItemsPerPage(selectedItemsPerPage);
  setCurrentPage(1); // Reset to first page
};

  return (
    <>
      <DataGrid
        items={currentItems}
        columns={props.advanced ? columns : columns.slice(0, 1).concat(columns.slice(3))} 
        sortable
        getRowId={(item) => item.sentence}
        focusMode="composite"
        className={styles.table}
        resizableColumns
        columnSizingOptions={columnSizes}
      >
        <DataGridHeader>
          <DataGridRow appearance="neutral" className={styles.color}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell >{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId} appearance="none">
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

      
      <div className="flex justify-center gap-2 mt-5">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={<ArrowLeftFilled />}
          className={styles.shadow}
        ></Button>
        <Select
          id={selectId}
          onChange={onSelectChange}
          value={currentPage.toString()}
          className={styles.shadow}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page.toString()}>
              {page}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={<ArrowRightFilled />}
          className={styles.shadow}
        ></Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor={selectItemsPerPageId} style={{ margin: '0 10px', fontWeight:'bold' }}>Items per page</label>
        <Select id={selectItemsPerPageId} onChange={onSelectItemsPerPageChange} value={itemsPerPage.toString()} className={styles.shadow}>
          {[5, 10, 20, 50].map((count) => (
            <option key={count} value={count.toString()}>
              {count}
            </option>
          ))}
        </Select>
      </div>

    </>
  );
};
