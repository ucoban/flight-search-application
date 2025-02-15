import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Itinerary } from "@/types/sky-scrapper";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";

interface FlightListingProps {
  flights: Itinerary[] | undefined;
}

const columns: ColumnDef<Itinerary>[] = [
  {
    accessorKey: "legs[0].carriers.marketing[0].logoUrl",
    header: () => <div className="flex items-center">Airline</div>,
    cell: ({ row }) => {
      const logoUrl = row.original.legs?.[0]?.carriers?.marketing?.[0]?.logoUrl;
      return logoUrl ? <img src={logoUrl} alt="Airline Logo" className="h-8 w-8" /> : "N/A";
    },
  },
  {
    accessorKey: "legs[0].carriers.marketing[0].name",
    header: () => <div className="flex items-center">Flight Details</div>,
    cell: ({ row }) => {
      const leg = row.original.legs?.[0];
      const startTime = leg?.departure
        ? new Date(leg.departure).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
        : "N/A";
      const endTime = leg?.arrival
        ? new Date(leg.arrival).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
        : "N/A";
      const airlineName = leg?.carriers?.marketing?.[0]?.name || "N/A";
      return (
        <div>
          <div>{`${startTime} - ${endTime}`}</div>
          <div className="text-sm text-muted-foreground">{airlineName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "legs[0].durationInMinutes",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Duration
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const leg = row.original.legs?.[0];
      const value = leg?.durationInMinutes;
      const originCode = leg?.origin?.displayCode || "N/A";
      const destinationCode = leg?.destination?.displayCode || "N/A";
      return (
        <div>
          <div>{value ? `${Math.floor(value / 60)} hr ${value % 60} min` : "N/A"}</div>
          <div className="text-sm text-muted-foreground">{`${originCode}-${destinationCode}`}</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.legs?.[0]?.durationInMinutes || 0;
      const b = rowB.original.legs?.[0]?.durationInMinutes || 0;
      return a - b;
    },
  },
  {
    accessorKey: "legs[0].stopCount",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Stops
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original.legs?.[0]?.stopCount;
      return value !== undefined ? (value === 0 ? "Nonstop" : `${value} stop${value > 1 ? "s" : ""}`) : "N/A";
    },
  },
  {
    accessorKey: "price.formatted",
    header: ({ column }) => (
      <Button
        className="inline-flex justify-end w-full"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original.price?.formatted;
      return <div className="text-right pr-4">{value ? value : "N/A"}</div>;
    },
  },
];

const FlightListing: React.FC<FlightListingProps> = ({ flights }) => {
  console.log("Flights data:", flights); // Debugging line
  const data = React.useMemo(() => flights || [], [flights]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table className="min-w-full shadow-md rounded-lg">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-b border-muted cursor-pointer hover:bg-muted"
              onClick={() => (window.location.href = `https://external-ticketing.com/purchase/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlightListing;
