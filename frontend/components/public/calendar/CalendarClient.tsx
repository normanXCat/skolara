"use client";

import React from "react";
import { useCalendar } from "@/hooks/public/calendar/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarControls } from "./CalendarControls";
import { CalendarGrid } from "./CalendarGrid";
import { EventDetailsModal } from "./EventDetailsModal";

export function CalendarClient() {
  const {
    currentDate,
    events,
    eventTypes,
    isLoading,
    selectedEvent,
    setSelectedEvent,
    nextMonth,
    prevMonth,
    getEventColor
  } = useCalendar();

  return (
    <div className="space-y-12">
      <CalendarHeader />
      
      <div className="space-y-8">
        <CalendarControls 
          currentDate={currentDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          eventTypes={eventTypes}
          getEventColor={getEventColor}
        />

        <CalendarGrid 
          currentDate={currentDate}
          events={events}
          isLoading={isLoading}
          onEventClick={setSelectedEvent}
          getEventColor={getEventColor}
        />
      </div>

      <EventDetailsModal 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventTypes={eventTypes}
        getEventColor={getEventColor}
      />
    </div>
  );
}
