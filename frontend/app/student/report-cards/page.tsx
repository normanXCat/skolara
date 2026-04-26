'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  IconDownload, 
  IconFileText,
  IconTrophy
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function StudentReportCardsPage() {
  const [reportCards, setReportCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportCards = async () => {
      try {
        const response = await api.get('/api/student/dashboard'); // Or specific endpoint
        // For demonstration, let's assume we fetch them
        // setReportCards(response.data.reportCards);
      } catch (error) {
        console.error('Failed to fetch report cards', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportCards();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="text-4xl font-black tracking-tight">
          Mes Bulletins Scolaires
        </Typography>
        <Typography variant="body" className="text-muted-foreground mt-2 font-medium">
          Accède et télécharge tes livrets scolaires officiels par semestre.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((sem) => (
          <motion.div
            key={sem}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: sem * 0.1 }}
          >
            <Card className="p-8 rounded-[2.5rem] border-border/40 bg-card/50 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <IconFileText size={160} />
               </div>
               
               <div className="relative z-10">
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase text-[10px] mb-4">
                    Semestre {sem}
                  </Badge>
                  <Typography variant="h2" className="text-3xl font-black tracking-tight mb-6">
                    Livrét Scolaire
                  </Typography>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center bg-background/40 p-4 rounded-2xl border border-border/10">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                              <IconTrophy size={20} />
                           </div>
                           <span className="text-sm font-bold text-muted-foreground">Moyenne</span>
                        </div>
                        <span className="text-xl font-black">-- / 20</span>
                     </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl gap-3 font-black text-lg shadow-lg group-hover:shadow-primary/20 transition-all">
                    <IconDownload size={20} />
                    Télécharger PDF
                  </Button>
                  
                  <p className="text-[10px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest opacity-50">
                    Document Officiel Skolara
                  </p>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Card className="p-10 rounded-[2.5rem] border-dashed border-2 border-border/40 bg-muted/5 flex flex-col items-center justify-center text-center">
         <div className="h-16 w-16 rounded-3xl bg-muted/20 flex items-center justify-center mb-6">
            <IconFileText size={32} className="opacity-20" />
         </div>
         <Typography variant="h3" className="text-xl font-bold opacity-40 uppercase tracking-tighter">Années précédentes</Typography>
         <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Tes bulletins des années antérieures seront archivés ici.
         </p>
      </Card>
    </div>
  );
}
