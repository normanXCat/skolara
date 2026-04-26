"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api-client";
import { addMonths, subMonths } from "date-fns";

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  eventType: string;
}

export interface CalendarEventType {
  value: string;
  label: string;
  color?: string;
}

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventTypes, setEventTypes] = useState<CalendarEventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const fetchEventTypes = useCallback(async () => {
    try {
      const response = await api.get<CalendarEventType[]>("/calendar/event-types");
      if (response.success && response.data.length > 0) {
        setEventTypes(response.data);
      } else {
        setEventTypes([
          { value: "holiday", label: "Vacances", color: "bg-green-500 text-white shadow-green-500/20" },
          { value: "exam", label: "Examens", color: "bg-red-500 text-white shadow-red-500/20" },
          { value: "meeting", label: "Réunions", color: "bg-blue-500 text-white shadow-blue-500/20" },
          { value: "other", label: "Autres", color: "bg-primary text-white shadow-primary/20" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch event types", error);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const response = await api.get<CalendarEvent[]>("/calendar/public", {
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

  useEffect(() => {
    fetchEventTypes();
  }, [fetchEventTypes]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventColor = (typeValue: string) => {
    const found = eventTypes.find(t => t.value === typeValue);
    const color = found?.color;
    
    if (!color) {
      return { className: "bg-primary text-white shadow-primary/20", style: {} };
    }
    
    const isHex = /^#?([0-9A-F]{3}){1,2}$/i.test(color);
    if (isHex) {
      const hexColor = color.startsWith('#') ? color : `#${color}`;
      return { 
        className: "text-white shadow-sm border-white/10", 
        style: { backgroundColor: hexColor } 
      };
    }
    
    const bgColor = color.split(' ')[0];
    return { 
      className: `${bgColor} text-white shadow-sm border-white/10`, 
      style: {} 
    };
  };

  return {
    currentDate,
    events,
    eventTypes,
    isLoading,
    selectedEvent,
    setSelectedEvent,
    nextMonth,
    prevMonth,
    getEventColor
  };
}
