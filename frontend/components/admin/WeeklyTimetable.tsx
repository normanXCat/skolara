'use client';

import { useState } from 'react';
import { format, startOfWeek, addDays, eachDayOfInterval, setHours, setMinutes, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimetableSlot {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  subject: { name: string; id: number };
  teacher: { user: { firstName: string; name: string } };
  room?: string;
}

interface WeeklyTimetableProps {
  slots: TimetableSlot[];
  onSlotClick?: (slot: TimetableSlot) => void;
  onEmptySlotClick?: (day: number, time: string) => void;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const HOURS = Array.from({ length: 23 }, (_, i) => {
  const h = Math.floor(i / 2) + 7;
  const m = i % 2 === 0 ? '00' : '30';
  return `${h.toString().padStart(2, '0')}:${m}`;
}).filter(t => t <= '18:00');

export function WeeklyTimetable({ slots, onSlotClick, onEmptySlotClick }: WeeklyTimetableProps) {
  // Generate a color for a subject ID
  const getSubjectColor = (subjectId: number) => {
    const colors = [
      'bg-blue-500/20 border-blue-500 text-blue-700',
      'bg-purple-500/20 border-purple-500 text-purple-700',
      'bg-emerald-500/20 border-emerald-500 text-emerald-700',
      'bg-orange-500/20 border-orange-500 text-orange-700',
      'bg-rose-500/20 border-rose-500 text-rose-700',
      'bg-indigo-500/20 border-indigo-500 text-indigo-700',
      'bg-amber-500/20 border-amber-500 text-amber-700',
    ];
    return colors[subjectId % colors.length];
  };

  const getSlotPosition = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const startMinutes = (startH - 7) * 60 + startM;
    const endMinutes = (endH - 7) * 60 + endM;
    
    return {
      top: `${(startMinutes / 30) * 4}rem`, // 4rem per 30min slot
      height: `${((endMinutes - startMinutes) / 30) * 4}rem`,
    };
  };

  return (
    <div className="flex flex-col h-full bg-background/50 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex border-b border-border/40 bg-muted/30">
        <div className="w-20 border-r border-border/40" />
        {DAYS.map((day, i) => (
          <div key={day} className="flex-1 text-center py-4 font-bold text-sm uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Grid body */}
      <div className="flex flex-1 overflow-y-auto relative custom-scrollbar" style={{ height: 'calc(11 * 8rem)' }}>
        {/* Time column */}
        <div className="w-20 border-r border-border/40 flex flex-col">
          {HOURS.map((time) => (
            <div key={time} className="h-16 flex items-start justify-center pt-1 text-[10px] font-bold text-muted-foreground border-b border-border/10">
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="flex-1 flex relative">
          {DAYS.map((day, dayIdx) => (
            <div key={day} className="flex-1 border-r border-border/10 relative">
              {/* Background slots for clicking empty areas */}
              {HOURS.map((time) => (
                <div 
                  key={time} 
                  className="h-16 border-b border-border/10 hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={() => onEmptySlotClick?.(dayIdx + 1, time)}
                />
              ))}

              {/* Timetable items for this day */}
              {slots
                .filter((s) => s.dayOfWeek === dayIdx + 1)
                .map((slot) => {
                  const { top, height } = getSlotPosition(slot.startTime, slot.endTime);
                  return (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "absolute left-1 right-1 rounded-xl border-l-4 p-3 shadow-lg cursor-pointer overflow-hidden z-20 group transition-all hover:scale-[1.02] hover:shadow-2xl",
                        getSubjectColor(slot.subject.id)
                      )}
                      style={{ top, height }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSlotClick?.(slot);
                      }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <p className="font-black text-xs uppercase leading-tight truncate">
                            {slot.subject.name}
                          </p>
                          <p className="text-[10px] font-medium opacity-80 mt-1">
                            {slot.teacher.user.firstName} {slot.teacher.user.name}
                          </p>
                        </div>
                        {slot.room && (
                          <div className="text-[10px] font-bold self-end bg-black/10 px-2 py-0.5 rounded-md">
                            Salle {slot.room}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
