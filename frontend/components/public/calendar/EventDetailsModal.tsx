"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { IconCalendarEvent, IconInfoCircle, IconChevronRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarEvent, CalendarEventType } from "@/hooks/public/calendar/useCalendar";

interface EventDetailsModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
  eventTypes: CalendarEventType[];
  getEventColor: (type: string) => { className: string; style: any };
}

export function EventDetailsModal({ 
  event, 
  onClose, 
  eventTypes, 
  getEventColor 
}: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-card border border-border/40 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
        >
          <div 
            className={cn("absolute top-0 left-0 w-full h-2 shadow-sm", getEventColor(event.eventType).className)} 
            style={getEventColor(event.eventType).style}
          />
          
          <div className="flex justify-between items-start mb-8">
            <div 
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border",
                getEventColor(event.eventType).className
              )}
              style={getEventColor(event.eventType).style}
            >
              {eventTypes.find(t => t.value === event.eventType)?.label || event.eventType}
            </div>
            <button 
              onClick={onClose}
              className="size-10 rounded-xl bg-muted/40 flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <IconChevronRight className="rotate-45" />
            </button>
          </div>

          <Typography variant="h2" className="mb-6">{event.title}</Typography>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-muted-foreground font-medium">
              <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                <IconCalendarEvent size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider opacity-50">Dates</p>
                <p className="text-foreground">
                  Du {format(new Date(event.startDate), "d MMMM yyyy", { locale: fr })}
                  <br /> 
                  Au {format(new Date(event.endDate), "d MMMM yyyy", { locale: fr })}
                </p>
              </div>
            </div>

            {event.description && (
              <div className="flex items-start gap-4 text-muted-foreground font-medium">
                <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <IconInfoCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider opacity-50">Description</p>
                  <p className="text-foreground leading-relaxed italic">"{event.description}"</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12">
            <button 
              onClick={onClose}
              className="w-full h-14 rounded-2xl bg-muted border border-border/40 font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-primary-foreground hover:border-primary/20 transition-all duration-300"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
