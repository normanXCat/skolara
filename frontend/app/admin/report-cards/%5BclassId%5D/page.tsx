'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SelectReusable } from '@/components/ui/select-reusable';
import { 
  IconArrowLeft, 
  IconFileExport, 
  IconChevronRight, 
  IconSchool,
  IconCircleCheck,
  IconCircleX,
  IconCalendarEvent
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function ClassReportCardsPage() {
  const { classId } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [semester, setSemester] = useState('1');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const schoolYear = "2024-2025";

  const semesterOptions = [
    { value: '1', label: '1er Semestre' },
    { value: '2', label: '2ème Semestre' },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/admin/report-cards/status/${classId}?semester=${semester}&schoolYear=${schoolYear}`);
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch report cards data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classId, semester]);

  const handleGenerateAll = async () => {
    setGenerating(true);
    try {
      const response = await api.post(`/api/admin/report-cards/generate-class`, {
        classId: Number(classId),
        semester: Number(semester),
        schoolYear
      });
      if (response.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Erreur lors de la génération', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="p-8 animate-pulse text-center">Chargement...</div>;

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <IconArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h1" className="text-3xl font-black tracking-tight">
                {(data as any)?.class?.name || 'Classe'}
              </Typography>
              <Badge className="bg-primary/10 text-primary border-primary/20">Semestre {semester}</Badge>
            </div>
            <Typography variant="body" className="text-muted-foreground mt-1 font-medium">
              Génération des livrets scolaires • {schoolYear}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-[200px]">
            <SelectReusable
              id="semester-select"
              label="Semestre"
              placeholder="Choisir"
              options={semesterOptions}
              value={semester}
              onValueChange={setSemester}
              icon={IconCalendarEvent}
            />
          </div>

          <Button 
            onClick={handleGenerateAll} 
            disabled={generating}
            className="h-14 px-6 rounded-full font-black gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            <IconFileExport size={20} />
            {generating ? 'Génération...' : 'Tout Générer'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data as any)?.students?.map((item: any, idx: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-6 rounded-[2rem] border-border/40 bg-card/50 backdrop-blur-xl group hover:border-primary/40 transition-all duration-500">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                     <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center font-black text-lg">
                        {item.firstName?.[0]}{item.lastName?.[0]}
                     </div>
                     <div>
                        <Typography variant="h4" className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">
                           {item.firstName} {item.lastName}
                        </Typography>
                        <Typography variant="body" className="text-xs text-muted-foreground font-medium">
                           ID: {item.id}
                        </Typography>
                     </div>
                  </div>
                  {item.reportCards?.length > 0 ? (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 gap-1 rounded-lg">
                       <IconCircleCheck size={12} />
                       Généré
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground border-border/40 gap-1 rounded-lg font-medium">
                       <IconCircleX size={12} />
                       Manquant
                    </Badge>
                  )}
               </div>

               <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    className="rounded-xl font-black text-sm gap-2"
                    onClick={() => router.push(`/admin/report-cards/preview/${item.id}`)}
                  >
                    Lancer l'aperçu
                    <IconChevronRight size={16} />
                  </Button>
                  
                  {item.reportCards?.length > 0 && (
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10">
                       <IconFileExport size={18} />
                    </Button>
                  )}
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
