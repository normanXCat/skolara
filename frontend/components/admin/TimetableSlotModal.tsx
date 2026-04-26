'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api-client';
import { toast } from '@/lib/toast-store';

interface TimetableSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  classId: number;
  schoolYear: string;
  initialData?: any;
}

export function TimetableSlotModal({
  isOpen,
  onClose,
  onSave,
  classId,
  schoolYear,
  initialData,
}: TimetableSlotModalProps) {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    subjectId: '',
    teacherId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    room: '',
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, teachRes] = await Promise.all([
          api.get<any>('/api/admin/subjects'),
          api.get<any>('/api/admin/teachers'),
        ]);
        if (subRes.success) setSubjects(subRes.data.subjects || subRes.data);
        if (teachRes.success) setTeachers(teachRes.data.teachers || teachRes.data);
      } catch (error) {
        console.error('Failed to fetch modal data', error);
      }
    };
    if (isOpen) {
      fetchData();
      if (initialData) {
        setFormData({
          subjectId: initialData.subjectId?.toString() || '',
          teacherId: initialData.teacherId?.toString() || '',
          dayOfWeek: initialData.dayOfWeek?.toString() || '',
          startTime: initialData.startTime || '',
          endTime: initialData.endTime || '',
          room: initialData.room || '',
        });
      } else {
        setFormData({
          subjectId: '',
          teacherId: '',
          dayOfWeek: '',
          startTime: '',
          endTime: '',
          room: '',
        });
      }
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        subjectId: parseInt(formData.subjectId),
        teacherId: parseInt(formData.teacherId),
        dayOfWeek: parseInt(formData.dayOfWeek),
        classId,
        schoolYear,
      };

      const response = initialData?.id
        ? await api.put(`/api/admin/timetables/${initialData.id}`, payload)
        : await api.post('/api/admin/timetables', payload);

      if (response.success) {
        toast.success(initialData?.id ? 'Créneau mis à jour' : 'Créneau créé');
        onSave();
        onClose();
      } else {
        toast.error(response.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm('Voulez-vous vraiment supprimer ce créneau ?')) return;

    setLoading(true);
    try {
      const response = await api.delete(`/api/admin/timetables/${initialData.id}`);
      if (response.success) {
        toast.success('Créneau supprimé');
        onSave();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? 'Modifier le créneau' : 'Ajouter un créneau'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">Matière</Label>
            <Select 
              value={formData.subjectId} 
              onValueChange={(val) => setFormData({...formData, subjectId: val})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner une matière" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teacher" className="text-right">Enseignant</Label>
            <Select 
              value={formData.teacherId} 
              onValueChange={(val) => setFormData({...formData, teacherId: val})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un enseignant" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.user?.firstName} {t.user?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="day" className="text-right">Jour</Label>
            <Select 
              value={formData.dayOfWeek} 
              onValueChange={(val) => setFormData({...formData, dayOfWeek: val})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Jour de la semaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Lundi</SelectItem>
                <SelectItem value="2">Mardi</SelectItem>
                <SelectItem value="3">Mercredi</SelectItem>
                <SelectItem value="4">Jeudi</SelectItem>
                <SelectItem value="5">Vendredi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">Début</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">Fin</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="room" className="text-right">Salle</Label>
            <Input
              id="room"
              value={formData.room}
              onChange={(e) => setFormData({...formData, room: e.target.value})}
              className="col-span-3"
              placeholder="Ex: 204"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            {initialData?.id && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                Supprimer
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Sauvegarde...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
