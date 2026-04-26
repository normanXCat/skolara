"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
    VisibilityState,
} from "@tanstack/react-table";
import { Settings2, SlidersHorizontal } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonReusable } from "@/components/ui/button-reusable";

export type ColumnWithIcon<TData, TValue = unknown> = ColumnDef<
    TData,
    TValue
> & {
    icon?: React.ComponentType<{ className?: string }>;
};

interface DataTableProps<TData, TValue> {
    columns: ColumnWithIcon<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    onRowClick?: (row: TData) => void;
    searchKey?: string;
    searchPlaceholder?: string;
    getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
    onRowClick,
    searchKey,
    searchPlaceholder,
    getRowId,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getRowId,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="space-y-6 w-full">
            {searchKey && (
                <div className="px-2">
                    <DataTableToolbar
                        table={table}
                        searchKey={searchKey}
                        searchPlaceholder={searchPlaceholder}
                    />
                </div>
            )}

            <div className="rounded-3xl border border-border/40 bg-background/50 backdrop-blur-xl shadow-xl relative group/table">
                {/* Float Cog Button */}
                <div className="absolute top-9 -right-4 z-50">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ButtonReusable variant="outline" size="icon">
                                <Settings2 className="size-4 text-muted-foreground transition-all group-hover:text-primary" />
                            </ButtonReusable>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 rounded-[2rem] p-3 border-border/50 backdrop-blur-3xl bg-background/95 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                        >
                            <div className="space-y-1">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="rounded-2xl pl-10 pr-4 py-2.5 cursor-pointer focus:bg-primary/5 capitalize text-xs font-bold transition-all duration-200"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value,
                                                    )
                                                }
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    {(
                                                        column.columnDef as ColumnWithIcon<TData>
                                                    ).icon &&
                                                        React.createElement(
                                                            (
                                                                column.columnDef as ColumnWithIcon<TData>
                                                            ).icon!,
                                                            {
                                                                className:
                                                                    "size-3.5 text-muted-foreground/60",
                                                            },
                                                        )}
                                                    <span className="truncate">
                                                        {typeof column.columnDef
                                                            .header === "string"
                                                            ? column.columnDef
                                                                  .header
                                                            : column.id}
                                                    </span>
                                                </div>
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Internal gradient shine */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <div className="overflow-x-auto custom-scrollbar">
                    <Table className="min-w-[800px] w-full border-collapse">
                        <TableHeader className="bg-muted/5 border-b border-border/40">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="hover:bg-transparent border-none"
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="h-14 px-8 text-[11px] font-black uppercase tracking-widest text-muted-foreground transition-colors group/header"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    {(
                                                        header.column
                                                            .columnDef as ColumnWithIcon<TData>
                                                    ).icon && (
                                                        <div className="p-1.5 rounded-lg bg-primary/[0.08] text-primary/70 transition-all duration-300 group-hover/header:bg-primary group-hover/header:text-primary-foreground group-hover/header:scale-110">
                                                            {React.createElement(
                                                                (
                                                                    header
                                                                        .column
                                                                        .columnDef as ColumnWithIcon<TData>
                                                                ).icon!,
                                                                {
                                                                    className:
                                                                        "size-3.5",
                                                                },
                                                            )}
                                                        </div>
                                                    )}
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext(),
                                                          )}
                                                </div>
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow
                                            key={`skeleton-${i}`}
                                            className="hover:bg-transparent border-b border-border/20 last:border-0"
                                        >
                                            {columns.map((_, j) => (
                                                <TableCell
                                                    key={`cell-${j}`}
                                                    className="h-20 px-8"
                                                >
                                                    <div className="h-4 w-full animate-pulse rounded-full bg-muted/30" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row, i) => (
                                        <motion.tr
                                            key={row.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: i * 0.03,
                                                ease: "circOut",
                                            }}
                                            className={cn(
                                                "group/row border-b border-border/30 transition-all hover:bg-primary/[0.03] last:border-0",
                                                onRowClick && "cursor-pointer",
                                            )}
                                            onClick={() =>
                                                onRowClick?.(row.original)
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="h-20 px-8 text-sm font-medium"
                                                    >
                                                        <div className="transition-all duration-300 group-hover/row:translate-x-0.5">
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                ))}
                                        </motion.tr>
                                    ))
                                ) : (
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-60 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-4 py-12">
                                                <div className="size-16 rounded-[2rem] bg-muted/10 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center animate-pulse">
                                                    <Settings2 className="size-6 text-muted-foreground/40" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black tracking-tight text-foreground/80">
                                                        Aucune donnée
                                                    </p>
                                                    <p className="text-sm text-muted-foreground font-medium mt-1">
                                                        Nous n'avons trouvé
                                                        aucun résultat
                                                        correspondant.
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="px-2 pt-2">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
