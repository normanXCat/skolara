'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import api from '@/lib/api-client';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function NotificationBell({ role }: { role: 'admin' | 'teacher' | 'student' | 'parent' }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/api/${role}/notifications`);
      if (response.success) {
        setNotifications((response.data as any) || []);
      }
      const countRes = await api.get('/api/notifications/unread-count');
      if (countRes.success) {
        setUnreadCount((countRes.data as any).count || 0);
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [role]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.patch(`/api/${role}/notifications/${id}/read`, {});
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative shadow-none rounded-xl" aria-label="Notifications">
          <Bell className="h-5 w-5" strokeWidth={2} />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/20"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-[340px] bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl p-0 overflow-hidden" sideOffset={8}>
        <DropdownMenuLabel className="flex justify-between items-center px-4 py-3 bg-muted/20">
          <span className="font-bold text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {unreadCount} nouv.
            </span>
          )}
        </DropdownMenuLabel>
        
        <div className="max-h-[360px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mb-3 opacity-20" />
              <p className="text-sm font-medium">Vous êtes à jour</p>
              <p className="text-xs opacity-60">Aucune notification pour le moment</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notif, idx) => (
                <div key={notif.id}>
                  {idx > 0 && <DropdownMenuSeparator className="m-0 bg-border/40" />}
                  <DropdownMenuItem 
                    className={cn(
                      "flex flex-col items-start px-4 py-3 cursor-pointer transition-colors rounded-none outline-none",
                      !notif.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/40"
                    )}
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    <div className="flex justify-between w-full items-center mb-1">
                      <span className={cn(
                        "font-bold text-xs uppercase tracking-wider",
                        !notif.isRead ? "text-primary" : "text-muted-foreground/80"
                      )}>
                        {notif.type}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground/60 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: fr })}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm line-clamp-2",
                      !notif.isRead ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}>
                      {notif.content}
                    </p>
                  </DropdownMenuItem>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-border/40" />
        <div className="p-2 bg-muted/10">
          <Link href={`/${role}/notifications`} passHref legacyBehavior>
            <Button variant="ghost" className="w-full rounded-xl text-primary font-semibold hover:bg-primary/10 hover:text-primary transition-colors h-10">
              Voir tout
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
