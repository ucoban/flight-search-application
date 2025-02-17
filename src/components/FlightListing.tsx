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
import FlightDetails from "./FlightDetails";
import FlightDuration from "./FlightDuration";
import FlightStops from "./FlightStops";
import { Button } from "./ui/button";

interface FlightListingProps {
  flights: Itinerary[] | undefined;
  isFetched: boolean;
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

const FlightListing = ({ flights, isFetched }: FlightListingProps) => {
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

  if (!isFetched) {
    return null;
  }

  if (isFetched && data.length === 0) {
    return <div className="text-center text-muted-foreground">No flights found</div>;
  }

  return (
    <section className="overflow-x-auto rounded-md border" aria-label="Flight search results">
      <div className="block md:hidden">
        {data.map((flight, index) => {
          const leg = flight.legs[0];
          const carrier = leg.carriers.marketing[0];
          return (
            <article key={index} className="border-b p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={carrier.logoUrl} alt={`${carrier.name} logo`} className="h-8 w-8 mr-2" />
                  <div>
                    <div className="font-medium">{carrier.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {leg.origin.displayCode} - {leg.destination.displayCode}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{flight.price.formatted}</div>
                  <div className="text-sm text-muted-foreground">Round trip</div>
                </div>
              </div>
              <div className="mt-2">
                <FlightDetails flight={flight} />
                <FlightStops stopCount={leg.stopCount} />
                <FlightDuration leg={leg} />
              </div>
            </article>
          );
        })}
      </div>
      <Table className="min-w-full shadow-md rounded-lg hidden md:table">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-4 py-2 text-left cursor-pointer text-sm font-medium"
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
              className="border-b cursor-pointer transition-colors duration-200"
              onClick={() => console.log(row.original)}
              role="row"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-2 text-sm" role="cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default FlightListing;
