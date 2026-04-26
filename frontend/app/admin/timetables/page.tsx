'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import InputReusable from '@/components/ui/input-reusable';
import { IconCalendar, IconChevronRight, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminTimetablesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/api/admin/classes');
        if (response.success) {
          setClasses((response.data as any).classes || response.data);
        }
      } catch (error) {
        console.error('Failed to fetch classes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h1" className="text-4xl font-black tracking-tighter">
            Emplois du temps
          </Typography>
          <Typography variant="body" className="text-muted-foreground mt-2">
            Sélectionnez une classe pour gérer son planning hebdomadaire.
          </Typography>
        </div>
      </div>

      <div className="max-w-md">
        <InputReusable
          id="search-timetable-classes"
          placeholder="Rechercher une classe..."
          icon={IconSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-32 rounded-3xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/admin/timetables/${cls.id}`}>
                <Card className="p-6 cursor-pointer group hover:bg-primary/5 border-border/40 hover:border-primary/50 transition-all duration-300 rounded-3xl overflow-hidden relative">
                  {/* Decorative icon background */}
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <IconCalendar size={120} />
                  </div>

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase mb-3">
                        {cls.level}
                      </div>
                      <Typography variant="h3" className="text-2xl font-black">
                        {cls.name}
                      </Typography>
                      <Typography variant="body" className="text-xs text-muted-foreground mt-1">
                        {cls._count?.students || 0} élèves
                      </Typography>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconChevronRight size={20} />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
