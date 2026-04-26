'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IconDownload, IconUser } from '@tabler/icons-react';
import { WeeklyTimetable } from '@/components/admin/WeeklyTimetable';
import { SelectReusable } from '@/components/ui/select-reusable';

export default function ParentTimetablePage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const schoolYear = "2024-2025";

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await api.get('/api/parent/dashboard');
        if (response.success) {
          const childrenData = (response.data as any).children || [];
          setChildren(childrenData);
          if (childrenData.length > 0) {
            setSelectedChildId(childrenData[0].id.toString());
          }
        }
      } catch (error) {
        console.error('Failed to fetch children', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChildId) {
      const fetchTimetable = async () => {
        try {
          const response = await api.get(`/api/parent/timetable?childId=${selectedChildId}&schoolYear=${schoolYear}`);
          if (response.success) {
            setSlots(response.data as any[]);
          }
        } catch (error) {
          console.error('Failed to fetch timetable', error);
        }
      };
      fetchTimetable();
    }
  }, [selectedChildId]);

  const childOptions = children.map(c => ({
    value: c.id.toString(),
    label: `${c.firstName} ${c.lastName}`,
  }));

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h1" className="text-3xl font-black tracking-tight">
            Emploi du Temps
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            Visualisez le planning de cours de vos enfants.
          </Typography>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-[220px]">
            <SelectReusable
              id="child-select"
              label="Enfant"
              placeholder="Choisir un enfant"
              options={childOptions}
              value={selectedChildId}
              onValueChange={setSelectedChildId}
              icon={IconUser}
            />
          </div>

          <Button variant="outline" size="icon" className="rounded-xl h-14 w-14 border-border/40">
            <IconDownload size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="w-full h-full rounded-3xl bg-muted animate-pulse" />
        ) : selectedChildId ? (
          <WeeklyTimetable slots={slots} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/20 border border-dashed rounded-3xl">
             <IconUser size={48} className="mb-4 opacity-20" />
             <Typography variant="body">Veuillez sélectionner un enfant pour voir son emploi du temps</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
