"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@/components/ui/typography";
import api from "@/lib/api-client";
import { 
  IconChevronLeft, 
  IconChevronRight, 
  IconPlus, 
  IconCalendarEvent,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconClock,
  IconX,
  IconDeviceFloppy,
  IconCheck
} from "@tabler/icons-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, startOfWeek, endOfWeek, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { EventForm } from "./form/EventForm";

interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  eventType: "holiday" | "exam" | "meeting" | "other";
  isPublic: boolean;
}

export function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventTypes, setEventTypes] = useState<any[]>([]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const response = await api.get<CalendarEvent[]>("/calendar/admin", {
        params: { month, year }
      });
      if (response.success) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  const fetchEventTypes = useCallback(async () => {
    try {
        const response = await api.get<any[]>("/calendar/event-types");
        if (response.success && response.data.length > 0) {
            setEventTypes(response.data);
        } else {
            // Fallback si l'API ne renvoie rien
            setEventTypes([
              { value: "exam", label: "Examen / Contrôle", color: "bg-destructive text-destructive" },
              { value: "holiday", label: "Vacances / Congé", color: "bg-emerald-500 text-emerald-500" },
              { value: "meeting", label: "Réunion / Conseil", color: "bg-blue-500 text-blue-500" },
              { value: "activity", label: "Activité / Sortie", color: "bg-amber-500 text-amber-500" },
              { value: "other", label: "Autre", color: "bg-primary text-primary" }
            ]);
        }
    } catch (error) {
        console.error("Failed to fetch event types", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchEventTypes();
  }, [fetchEvents, fetchEventTypes]);

  const handleDayClick = (day: Date) => {
    setEditingEvent({
      id: 0,
      title: "",
      startDate: format(day, "yyyy-MM-dd'T'HH:mm"),
      endDate: format(day, "yyyy-MM-dd'T'HH:mm"),
      eventType: "other",
      isPublic: true,
    });
    setShowModal(true);
  };

  const handleEditClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet événement ?")) return;
    try {
      const response = await api.delete(`/calendar/admin/${id}`);
      if (response.success) {
        fetchEvents();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

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

  const getEventColor = (type: string) => {
    const found = eventTypes.find(t => t.value === type);
    const color = found?.color;
    
    if (!color) {
      return { className: "bg-primary text-white shadow-primary/20", style: {} };
    }
    
    // Vérification si c'est un code hexadécimal (avec ou sans #)
    const isHex = /^#?([0-9A-F]{3}){1,2}$/i.test(color);
    
    if (isHex) {
      const hexColor = color.startsWith('#') ? color : `#${color}`;
      return { 
        className: "text-white shadow-sm", 
        style: { backgroundColor: hexColor } 
      };
    }
    
    // Si c'est une liste de classes Tailwind
    const bgColor = color.split(' ')[0];
    return { 
      className: `${bgColor} text-white shadow-sm`, 
      style: {} 
    };
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <Typography variant="h1">Calendrier Académique</Typography>
           <Typography className="text-muted-foreground">Plannifiez les vacances, examens et réunions scolaires.</Typography>
        </div>
        <ButtonReusable
          leftIcon={<IconPlus size={20} />}
          onClick={() => handleDayClick(new Date())}
        >
          Ajouter un événement
        </ButtonReusable>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 px-8 bg-card border border-border/40 rounded-3xl">
        <div className="flex items-center gap-6">
           <button 
             onClick={() => setCurrentDate(subMonths(currentDate, 1))}
             className="size-12 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
           >
             <IconChevronLeft size={24} />
           </button>
           <div className="text-center min-w-[200px]">
             <Typography variant="h2" className="capitalize text-2xl font-black">
               {format(currentDate, "MMMM yyyy", { locale: fr })}
             </Typography>
           </div>
           <button 
             onClick={() => setCurrentDate(addMonths(currentDate, 1))}
             className="size-12 rounded-2xl bg-muted/40 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
           >
             <IconChevronRight size={24} />
           </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center md:justify-end flex-1">
            {eventTypes.length > 0 ? eventTypes.map((type, i) => (
              <motion.div 
                key={type.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "group relative flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-border/40 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5",
                  "backdrop-blur-sm bg-muted/20"
                )}
              >
                <div 
                  className={cn(
                    "size-2.5 rounded-full transition-all duration-500 group-hover:scale-125 shrink-0",
                    getEventColor(type.value).className
                  )} 
                  style={getEventColor(type.value).style}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground group-hover:text-primary transition-colors">
                  {type.label}
                </span>
                
                {/* Subtle highlight effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            )) : (
              <div className="flex gap-3">
                {[1, 2, 3, 4].map(i => (
                  <SkeletonReusable 
                    key={i}
                    width={100} 
                    height={36} 
                    variant="shimmer" 
                    shape="rounded" 
                    className="rounded-2xl"
                  />
                ))}
              </div>
            )}
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-7 border-bottom border-border/40 bg-muted/20">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
              <div key={day} className="py-5 text-center text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {daysInMonth.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              const dayIsToday = isToday(day);
              const isCurrentMonth = isSameMonth(day, currentDate);

              return (
                <div 
                  key={i} 
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "min-h-[140px] border border-border/10 p-3 transition-all cursor-pointer relative group",
                    !isCurrentMonth && "bg-muted/5 opacity-30",
                    dayIsToday && "bg-primary/5",
                    "hover:bg-primary/10"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-sm font-black size-8 flex items-center justify-center rounded-xl transition-all",
                      dayIsToday ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-foreground/40 group-hover:text-foreground"
                    )}>
                      {format(day, "d")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(event);
                        }}
                        className={cn(
                          "px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter truncate border border-white/10 shadow-sm",
                          getEventColor(event.eventType).className
                        )}
                        style={getEventColor(event.eventType).style}
                      >
                         {!event.isPublic && <IconEyeOff size={10} className="inline mr-1" />}
                         {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Modal d'ajout/édition - Désormais délégué au composant EventForm */}
      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <AnimatePresence>
          {showModal && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-[50%] top-[50%] z-[200] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] focus:outline-none"
                >
                  <div className="relative flex flex-col overflow-hidden rounded-[3rem] border border-border/50 bg-background shadow-2xl max-h-[90vh] w-full">
                    <div className="absolute -top-32 -right-32 size-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex justify-between items-center p-10 pb-6 bg-background/50 backdrop-blur-md border-b border-border/40 z-20">
                      <Dialog.Title asChild>
                        <div>
                          <Typography variant="h2" className="text-2xl font-black">
                            {editingEvent?.id ? "Modifier l'événement" : "Nouvel Événement"}
                          </Typography>
                          <Typography className="text-muted-foreground font-medium">
                            {editingEvent?.id ? "Mettez à jour les informations de cet événement." : "Remplissez les détails ci-dessous."}
                          </Typography>
                        </div>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="rounded-full p-3 text-muted-foreground hover:bg-muted transition-colors">
                          <IconX size={24} />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Contenu du formulaire séparé */}
                    <div className="flex-1 overflow-y-auto p-10 pt-8 space-y-8 relative z-10 custom-scrollbar">
                      <EventForm 
                        initialData={editingEvent}
                        isEdit={!!(editingEvent && editingEvent.id !== 0)}
                        onSuccess={() => {
                          fetchEvents();
                          setShowModal(false);
                        }}
                        onCancel={() => setShowModal(false)}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}
