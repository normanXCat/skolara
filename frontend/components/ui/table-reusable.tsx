"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Settings2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
import { ButtonReusable } from "@/components/ui/button-reusable";
import { cn } from "@/lib/utils";

interface TableReusableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    className?: string;
}

export function TableReusable<TData, TValue>({
    columns,
    data,
    className,
}: TableReusableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    });

    return (
        <div className={cn("space-y-4 w-full", className)}>
            {/* Header of Table / Controls */}
            <div className="flex items-center justify-end px-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <ButtonReusable
                            variant="outline"
                            size="icon"
                            className="bg-background/40 backdrop-blur-md border hover:bg-background/60 transition-all rounded-xl"
                        >
                            <Settings2 className="size-4 text-muted-foreground" />
                        </ButtonReusable>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-64 rounded-[2rem] p-3 border-border/50 backdrop-blur-3xl bg-background/95 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                    >
                        <div className="px-4 py-2 border-b border-border/10 mb-2 flex items-center gap-2">
                            <SlidersHorizontal
                                size={14}
                                className="text-primary"
                            />
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                Colonnes
                            </span>
                        </div>
                        <div className="space-y-0.5">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="rounded-xl pl-10 pr-4 py-2.5 cursor-pointer focus:bg-primary/5 capitalize text-xs font-bold transition-all duration-200"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {typeof column.columnDef.header ===
                                            "string"
                                                ? column.columnDef.header
                                                : column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Container Responsif de la table */}
            <div className="rounded-[2.5rem] border border-border/40 bg-background/40 backdrop-blur-xl shadow-sm overflow-hidden relative group/table">
                {/* Subtle internal shine */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

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
                                                className="h-14 text-[10px] uppercase font-black tracking-widest text-muted-foreground px-6"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {table.getRowModel().rows?.length ? (
                                    table
                                        .getRowModel()
                                        .rows.map((row, index) => (
                                            <motion.tr
                                                key={row.id}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.05,
                                                }}
                                                data-state={
                                                    row.getIsSelected() &&
                                                    "selected"
                                                }
                                                className="group/row transition-colors hover:bg-primary/[0.02] border-b border-border/30 last:border-0"
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="px-6 py-4 transition-all duration-300"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </motion.tr>
                                        ))
                                ) : (
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-40 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                                                <div className="size-12 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                                                    <Settings2 className="size-5" />
                                                </div>
                                                <span className="text-sm font-bold">
                                                    Aucun résultat trouvé
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Table Footer info? (Optional) */}
            <div className="flex items-center justify-between px-6 text-[10px] text-muted-foreground uppercase font-black tracking-tighter opacity-50">
                <span>{table.getRowModel().rows?.length || 0} résultats</span>
                <span className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-primary" />
                    Actualisation automatique
                </span>
            </div>
        </div>
    );
}
