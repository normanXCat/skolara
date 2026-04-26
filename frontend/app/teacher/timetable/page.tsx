'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IconDownload } from '@tabler/icons-react';
import { WeeklyTimetable } from '@/components/admin/WeeklyTimetable';

export default function TeacherTimetablePage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const schoolYear = "2024-2025";

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await api.get(`/api/teacher/timetable?schoolYear=${schoolYear}`);
        if (response.success) {
          setSlots(response.data as any[]);
        }
      } catch (error) {
        console.error('Failed to fetch timetable', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h1" className="text-3xl font-black tracking-tight">
            Mon Emploi du Temps
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            Année Scolaire {schoolYear}
          </Typography>
        </div>
        
        <Button variant="outline" className="rounded-xl border-border/40 gap-2">
          <IconDownload size={18} />
          Exporter PDF
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="w-full h-full rounded-3xl bg-muted animate-pulse" />
        ) : (
          <WeeklyTimetable slots={slots} />
        )}
      </div>
    </div>
  );
}
