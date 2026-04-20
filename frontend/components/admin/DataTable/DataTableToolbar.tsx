"use client";

import { Table } from "@tanstack/react-table";
import { IconX, IconSearch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import InputReusable from "@/components/ui/input-reusable";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchPlaceholder?: string;
    searchKey: string;
}

export function DataTableToolbar<TData>({
    table,
    searchPlaceholder = "Rechercher...",
    searchKey,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center space-x-3">
                <InputReusable
                    id="table-search"
                    placeholder={searchPlaceholder}
                    icon={IconSearch}
                    value={
                        (table
                            .getColumn(searchKey)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchKey)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-12 px-5 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-rose-500/10 hover:text-rose-600"
                    >
                        Effacer les filtres
                        <IconX className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Emplacement pour les actions de droite (filtres avancés, export, etc.) */}
            <div id="table-toolbar-actions" />
        </div>
    );
}
