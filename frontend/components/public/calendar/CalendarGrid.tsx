"use client";

import React from "react";
import { format, isSameDay, isSameMonth, isToday, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { CalendarEvent } from "@/hooks/public/calendar/useCalendar";

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  isLoading: boolean;
  onEventClick: (event: CalendarEvent) => void;
  getEventColor: (type: string) => { className: string; style: any };
}

export function CalendarGrid({ 
  currentDate, 
  events, 
  isLoading, 
  onEventClick, 
  getEventColor 
}: CalendarGridProps) {
  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 }),
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return isSameDay(day, start) || (day > start && day <= end);
    });
  };

  return (
    <div className="bg-background/40 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-2xl">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 border-bottom border-border/40 bg-muted/20">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
          <div key={day} className="py-6 text-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {isLoading ? (
          Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square border border-border/10 p-2">
              <SkeletonReusable className="w-8 h-8 rounded-lg mb-2" />
              <SkeletonReusable className="w-full h-4 rounded-md" />
            </div>
          ))
        ) : (
          daysInMonth.map((day, i) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div 
                key={i} 
                className={cn(
                  "aspect-square border border-border/10 p-4 transition-colors relative group",
                  !isSameMonth(day, currentDate) && "bg-muted/5 opacity-30",
                  isToday(day) && "bg-primary/5"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-sm font-black size-8 flex items-center justify-center rounded-xl transition-all",
                    isToday(day) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-foreground/40 group-hover:text-foreground"
                  )}>
                    {format(day, "d")}
                  </span>
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[calc(100%-2.5rem)] custom-scrollbar">
                  {dayEvents.map(event => (
                    <motion.button
                      layoutId={`event-${event.id}`}
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={cn(
                        "w-full text-left px-2 py-1 rounded-lg text-[10px] font-bold border truncate hover:scale-[1.02] transition-transform shadow-sm",
                        getEventColor(event.eventType).className
                      )}
                      style={getEventColor(event.eventType).style}
                    >
                      {event.title}
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
