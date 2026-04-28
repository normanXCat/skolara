'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api-client';
import { Typography } from '@/components/ui/typography';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

export function NotificationBell({ role }: { role: 'admin' | 'teacher' | 'student' | 'parent' }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

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
      const msgRes = await api.get('/api/messages/unread-count');
      if (msgRes.success) {
        setUnreadMessagesCount((msgRes.data as any).count || 0);
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
    <div className="flex items-center gap-1">
      <Link href={`/${role}/messages`}>
        <Button variant="ghost" size="icon" className="relative mr-1" aria-label="Messages">
          <Mail className="h-5 w-5" />
          {unreadMessagesCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] shadow-sm animate-pulse-once"
            >
              {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
            </Badge>
          )}
        </Button>
      </Link>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-background rounded-3xl ml-10">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          <Link href={`/${role}/notifications`} className="text-xs text-primary hover:underline">
            Voir tout
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Aucune notification
          </div>
        ) : (
          notifications.map((notif) => (
            <DropdownMenuItem 
              key={notif.id} 
              className={`flex flex-col items-start p-3 ${!notif.isRead ? 'bg-muted/50' : ''}`}
              onClick={() => handleMarkAsRead(notif.id)}
            >
              <div className="flex justify-between w-full mb-1">
                <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  {notif.type}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: fr })}
                </span>
              </div>
              <p className="text-sm line-clamp-2">{notif.content}</p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
