'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IconArrowLeft, IconPlus, IconDownload } from '@tabler/icons-react';
import { WeeklyTimetable } from '@/components/admin/WeeklyTimetable';
import { TimetableSlotModal } from '@/components/admin/TimetableSlotModal';

export default function ClassTimetablePage() {
  const { id } = useParams();
  const router = useRouter();
  const [slots, setSlots] = useState<any[]>([]);
  const [classInfo, setClassInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  
  const schoolYear = "2024-2025"; // Can be dynamic

  const fetchTimetable = async () => {
    try {
      const [tableRes, classRes] = await Promise.all([
        api.get(`/api/admin/timetables?classId=${id}&schoolYear=${schoolYear}`),
        api.get(`/api/admin/classes/${id}`),
      ]);
      
      if (tableRes.success) setSlots(tableRes.data as any[]);
      if (classRes.success) setClassInfo(classRes.data);
    } catch (error) {
      console.error('Failed to fetch timetable', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [id]);

  const handleSlotClick = (slot: any) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleEmptySlotClick = (day: number, time: string) => {
    // Round time to nearest 30min if needed, already handled by grid
    setSelectedSlot({ dayOfWeek: day, startTime: time, endTime: calculateEndTime(time) });
    setIsModalOpen(true);
  };

  const calculateEndTime = (startTime: string) => {
    const [h, m] = startTime.split(':').map(Number);
    let endH = h;
    let endM = m + 30;
    if (endM >= 60) {
      endH += 1;
      endM = 0;
    }
    return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-full h-12 w-12 border-border/40 bg-background/50"
        >
          <IconArrowLeft size={24} />
        </Button>
        <div>
          <div className="flex items-center gap-3">
             <Typography variant="h1" className="text-3xl font-black tracking-tight">
               {classInfo?.name || 'Chargement...'}
             </Typography>
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase">
               {classInfo?.level}
             </span>
          </div>
          <Typography variant="body" className="text-muted-foreground">
            Configuration et ajustement des créneaux de cours pour cette classe.
          </Typography>
        </div>
        
        <div className="ml-auto flex gap-3">
          <Button variant="outline" className="rounded-xl border-border/40 gap-2">
            <IconDownload size={18} />
            Exporter PDF
          </Button>
          <Button 
            className="rounded-xl gap-2 shadow-lg shadow-primary/20"
            onClick={() => {
              setSelectedSlot(null);
              setIsModalOpen(true);
            }}
          >
            <IconPlus size={18} />
            Ajouter un cours
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="w-full h-full rounded-3xl bg-muted animate-pulse" />
        ) : (
          <WeeklyTimetable 
            slots={slots} 
            onSlotClick={handleSlotClick}
            onEmptySlotClick={handleEmptySlotClick}
          />
        )}
      </div>

      <TimetableSlotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchTimetable}
        classId={Number(id)}
        schoolYear={schoolYear}
        initialData={selectedSlot}
      />
    </div>
  );
}
