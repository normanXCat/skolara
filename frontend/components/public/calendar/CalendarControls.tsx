"use client";

import React from "react";
import { Typography } from "@/components/ui/typography";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarEventType } from "@/hooks/public/calendar/useCalendar";

interface CalendarControlsProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  eventTypes: CalendarEventType[];
  getEventColor: (type: string) => { className: string; style: any };
}

export function CalendarControls({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  eventTypes,
  getEventColor 
}: CalendarControlsProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
      <div className="flex items-center gap-6">
        <button 
          onClick={onPrevMonth}
          className="size-12 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <IconChevronLeft size={24} />
        </button>
        <div className="text-center min-w-[200px]">
          <Typography variant="h2" className="capitalize">
            {format(currentDate, "MMMM yyyy", { locale: fr })}
          </Typography>
        </div>
        <button 
          onClick={onNextMonth}
          className="size-12 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <IconChevronRight size={24} />
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {eventTypes.map(type => (
          <div key={type.value} className="flex items-center gap-2">
            <div 
              className={cn("size-3 rounded-full border", getEventColor(type.value).className)} 
              style={getEventColor(type.value).style}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {type.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
