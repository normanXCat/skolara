"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  IconMail,
  IconSearch,
  IconCalendarEvent,
  IconMailOpened,
  IconTrash,
  IconCornerUpLeft,
  IconCheck
} from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import InputReusable from "@/components/ui/input-reusable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { toast } from "@/lib/toast-store";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  receivedAt: string;
  repliedAt: string | null;
  status: string;
}

export function ContactMessageList() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const response = await api.get<any>(`/contact/admin?${params.toString()}`);
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      toast.error("Impossible de charger les messages");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (msg: ContactMessage) => {
    if (!msg.isRead) {
      try {
        await api.patch(`/contact/admin/${msg.id}/read`, {});
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m)));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const res = await api.delete(`/contact/admin/${id}`);
      if (res.success) {
        toast.success("Message supprimé");
        if (selectedMessage?.id === id) setSelectedMessage(null);
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (e) {
      toast.error("Erreur réseau");
    }
  };

  const filteredMessages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((m) => {
      const name = m.fullName.toLowerCase();
      const subject = m.subject.toLowerCase();
      const email = m.email.toLowerCase();
      return name.includes(q) || subject.includes(q) || email.includes(q);
    });
  }, [messages, searchQuery]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
      {/* Sidebar — liste condescendée */}
      <div 
        className={cn(
            "self-start lg:sticky lg:top-0 lg:h-[calc(100vh-[calculate header] lg:h-[calc(100vh-140px)]",
            selectedMessage ? "hidden lg:block" : "block"
        )}
        style={{ height: "calc(100vh - 180px)" }}
      >
        <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full flex flex-col">
          <CardContent className="p-5 h-full flex flex-col gap-4 min-h-0">
            <InputReusable
              id="admin-contact-search"
              placeholder="Rechercher un message..."
              icon={IconSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="pt-1 flex-1 min-h-0 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                  <Typography variant="overline" className="text-muted-foreground">
                    BOÎTE DE RÉCEPTION
                  </Typography>
                  <Badge variant="default" className="rounded-lg font-black bg-primary/20 text-primary border-none text-[10px]">
                      {messages.filter(m => !m.isRead).length} nouveaux
                  </Badge>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-1 custom-scrollbar pb-4">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border border-border/30 bg-background/20 space-y-2"
                      >
                        <SkeletonReusable width="60%" height={12} />
                        <SkeletonReusable width="85%" height={10} />
                      </div>
                    ))}
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center mt-10">Aucun message trouvé.</p>
                ) : (
                  filteredMessages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                        <button
                          key={msg.id}
                          onClick={() => {
                              setSelectedMessage(msg);
                              markAsRead(msg);
                          }}
                          className={cn(
                              "group relative block w-full text-left p-4 rounded-2xl border transition-all overflow-hidden",
                              isSelected 
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                                : "border-border/40 bg-background/30 hover:bg-background/40 hover:border-primary/20"
                          )}
                        >
                          <div className={cn("absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 pointer-events-none", isSelected ? "text-white opacity-[0.1]" : "text-primary group-hover:opacity-[0.07]")}>
                            <IconMail size={64} strokeWidth={1} />
                          </div>
                          
                          <div className="flex items-start justify-between gap-2 mb-1">
                              <p className={cn(
                                "text-sm truncate font-black flex-1",
                                isSelected ? "text-white" : (msg.isRead ? "text-foreground" : "text-primary")
                              )}>
                                {msg.fullName}
                              </p>
                              <p className={cn(
                                "text-[10px] font-bold whitespace-nowrap mt-0.5",
                                isSelected ? "text-white/80" : "text-muted-foreground"
                              )}>
                                {format(new Date(msg.receivedAt), "dd MMM")}
                              </p>
                          </div>
                          
                          <p className={cn("text-xs mt-1 truncate font-medium", isSelected ? "text-white/90" : "text-foreground/85")}>
                            {msg.subject}
                          </p>
                          <p className={cn("text-[10px] mt-1 truncate", isSelected ? "text-white/70" : "text-muted-foreground")}>
                            {msg.email}
                          </p>
                        </button>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main — détails du message */}
      <div 
        className={cn(
            "self-start lg:sticky lg:top-0",
            !selectedMessage ? "hidden lg:block" : "block"
        )}
        style={{ height: "calc(100vh - 180px)" }}
      >
        <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full flex flex-col">
          <CardContent className="p-0 h-full overflow-hidden flex flex-col min-h-0">
            {!selectedMessage ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-background/10 to-background/40">
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <IconMailOpened size={28} className="text-primary" />
                  </div>
                  <Typography variant="h3" className="text-xl font-black">
                    Sélectionnez un message
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground max-w-md mt-2">
                    Choisissez un message dans la liste pour le consulter complètement et y répondre.
                  </Typography>
                </div>
            ) : (
                <div className="flex flex-col flex-1 min-h-0 bg-gradient-to-b from-background/10 to-background/40">
                    <div className="px-5 md:px-7 py-5 md:py-6 border-b border-border/40 flex flex-col gap-4 relative shrink-0">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden absolute top-5 md:top-6 right-5 md:right-7">
                            <ButtonReusable variant="outline" size="sm" onClick={() => setSelectedMessage(null)} leftIcon={<IconCornerUpLeft size={16} />}>
                                Retour
                            </ButtonReusable>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap mb-1 pr-20 lg:pr-0">
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-full font-bold">
                                Demande de Contact
                            </Badge>
                            {selectedMessage.repliedAt && (
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full font-bold">
                                    <IconCheck size={14} className="mr-1" />
                                    Traité le {format(new Date(selectedMessage.repliedAt), "dd/MM/yy")}
                                </Badge>
                            )}
                        </div>
                        
                        <Typography variant="h3" className="text-2xl md:text-3xl font-black">
                            {selectedMessage.subject}
                        </Typography>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 uppercase font-black text-xl text-primary">
                                    {selectedMessage.fullName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-foreground text-base truncate">
                                        {selectedMessage.fullName}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5 truncate">
                                        <IconMail size={14} className="text-primary/70 shrink-0" />
                                        <span className="truncate">{selectedMessage.email}</span>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1.5 truncate">
                                        <IconCalendarEvent size={14} className="text-primary/70 shrink-0" />
                                        <span className="truncate">{format(new Date(selectedMessage.receivedAt), "EEEE dd MMMM yyyy 'à' HH:mm", { locale: fr })}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <ButtonReusable 
                                    variant="outline" 
                                    size="sm"
                                    className="border-red-500/20 hover:bg-red-500/10 text-red-500"
                                    onClick={() => {
                                        if(confirm("Supprimer ce message ?")) deleteMessage(selectedMessage.id);
                                    }}
                                    leftIcon={<IconTrash size={16} />}
                                >
                                    Supprimer
                                </ButtonReusable>
                                <ButtonReusable 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                                    leftIcon={<IconCornerUpLeft size={16} />}
                                >
                                    Répondre
                                </ButtonReusable>
                            </div>
                        </div>
                    </div>
    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-7">
                        <div className="prose prose-sm md:prose-base max-w-none text-foreground/90 whitespace-pre-wrap font-medium">
                            {selectedMessage.message}
                        </div>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
