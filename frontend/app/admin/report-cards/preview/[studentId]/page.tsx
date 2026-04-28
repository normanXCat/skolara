'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextareaReusable from '@/components/ui/textarea-reusable';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/lib/toast-store';
import { 
  IconArrowLeft, 
  IconCheck,
  IconAlertCircle,
  IconLoader2,
  IconNotes
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function StudentReportCardPreviewPage() {
  const { studentId } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const schoolYear = "2024-2025";
  const semester = 1;

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await api.get(`/api/admin/report-cards/preview/${studentId}?schoolYear=${schoolYear}&semester=${semester}`);
        if (response.success) {
          setData(response.data);
          setFeedback((response.data as any)?.reportCard?.generalAppreciation || '');
        }
      } catch (error) {
        console.error('Failed to fetch report card preview', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, [studentId]);

  const handleFinalize = async () => {
    setSaving(true);
    try {
      const response = await api.post(`/api/admin/report-cards/finalize`, {
        studentId: Number(studentId),
        schoolYear,
        semester,
        generalAppreciation: feedback,
      });
      if (response.success) {
        toast.success('Bulletin finalisé avec succès !');
        router.back();
      }
    } catch (error) {
      console.error('Failed to finalize report card', error);
      toast.error('Erreur lors de la finalisation du bulletin.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-muted-foreground">
        <IconLoader2 size={24} className="animate-spin" />
        <span className="font-bold">Chargement de l'aperçu...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <IconArrowLeft size={20} />
          </Button>
          <div>
            <Typography variant="h1" className="text-3xl font-black tracking-tight">
               Bulletin de {data?.student?.firstName} {data?.student?.lastName}
            </Typography>
            <Typography variant="body" className="text-muted-foreground font-medium">
               Aperçu avant finalisation • {data?.class?.name} • Semestre {semester}
            </Typography>
          </div>
        </div>
        
        <Button 
          onClick={handleFinalize} 
          disabled={saving}
          className="h-12 px-8 rounded-xl font-black gap-2 shadow-xl shadow-primary/20"
        >
          {saving ? <IconLoader2 size={20} className="animate-spin" /> : <IconCheck size={20} />}
          Finaliser le Bulletin
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary and Feedback */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 rounded-[2.5rem] bg-card/50 backdrop-blur-xl border-border/40">
             <div className="text-center mb-8">
                <div className="h-24 w-24 rounded-3xl bg-primary/10 text-primary mx-auto flex items-center justify-center font-black text-3xl mb-4">
                   {(data?.overallAverage || 0).toFixed(2)}
                </div>
                <Typography variant="h3" className="text-xl font-black">Moyenne Générale</Typography>
                <Badge variant="outline" className="mt-2 font-bold uppercase tracking-wider px-3">{data?.mention || 'NON DÉFINIE'}</Badge>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-2xl">
                   <div className="flex items-center gap-2 text-sm font-bold opacity-60">
                      <IconAlertCircle size={16} />
                      Absences
                   </div>
                   <span className="font-black text-lg">{data?.absencesCount || 0}</span>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-border/40">
              <Typography variant="h3" className="text-xl font-black mb-4">Appréciation Générale</Typography>
              <TextareaReusable
                id="general-appreciation"
                label="Commentaires de la direction"
                placeholder="Saisissez l'appréciation globale pour l'élève..."
                icon={IconNotes}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Typography variant="body" className="text-xs text-muted-foreground mt-4 italic font-medium">
                Cette appréciation apparaîtra sur le bulletin officiel final de l'élève.
              </Typography>
             </div>
          </Card>
        </div>

        {/* Right: Grades Detailed Table */}
        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] bg-card/50 backdrop-blur-xl border-border/40 overflow-hidden">
             <div className="p-8 border-b border-border/40">
                <Typography variant="h3" className="text-xl font-black">Détail des Résultats</Typography>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-muted/30">
                         <th className="p-6 font-black uppercase text-[10px] tracking-widest opacity-50">Matière</th>
                         <th className="p-6 font-black uppercase text-[10px] tracking-widest opacity-50 text-center">Moyenne</th>
                         <th className="p-6 font-black uppercase text-[10px] tracking-widest opacity-50">Appréciation Enseignant</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border/20">
                      {data?.gradesBySubject?.map((item: any) => (
                        <tr key={item.subjectId} className="hover:bg-muted/10 transition-colors">
                           <td className="p-6">
                              <span className="font-black text-foreground">{item.subjectName}</span>
                           </td>
                           <td className="p-6 text-center">
                              <span className="inline-flex h-10 w-10 rounded-xl bg-muted items-center justify-center font-black text-primary">
                                {item.average?.toFixed(2)}
                              </span>
                           </td>
                           <td className="p-6">
                              <Typography variant="body" className="text-sm opacity-70 italic line-clamp-2">
                                {item.teacherFeedback || "Aucune appréciation saisie par l'enseignant."}
                              </Typography>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
