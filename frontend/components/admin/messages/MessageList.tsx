"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "@/components/ui/typography";
import api from "@/lib/api-client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { StatusBadge } from "../StatusBadge";
import * as Dialog from "@radix-ui/react-dialog";
import { 
  IconMail, 
  IconMailOpened, 
  IconTrash, 
  IconArrowBackUp,
  IconClock,
  IconUser,
  IconSend,
  IconX,
  IconSearch,
  IconInbox
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/lib/toast-store";
import { cn } from "@/lib/utils";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import InputReusable from "@/components/ui/input-reusable";
import UserAvatar from "@/components/common/user-avatar";

interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  status: "pending" | "replied" | "ignored";
  receivedAt: string;
}

export function MessageList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<ContactMessage[]>("/contact/admin");
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
      toast.error("Erreur lors du chargement des messages");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await api.patch<{id: number}>(`/contact/admin/${id}/read`);
      if (response.success) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
      }
    } catch (error) {
      console.error("Failed to mark message as read", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      const response = await api.delete(`/contact/admin/${id}`);
      if (response.success) {
        toast.success("Message supprimé");
        setMessages(prev => prev.filter(m => m.id !== id));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    setIsReplying(true);
    try {
      const response = await api.post(`/contact/admin/${selectedMessage.id}/reply`, {
        message: replyText
      });
      if (response.success) {
        toast.success("Réponse envoyée avec succès");
        setMessages(prev => prev.map(m => 
          m.id === selectedMessage.id ? { ...m, status: "replied" as const, isRead: true } : m
        ));
        setReplyText("");
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Failed to send reply", error);
      toast.error("Erreur lors de l'envoi de la réponse");
    } finally {
      setIsReplying(false);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <Typography variant="h1" className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
             Boîte de Messagerie
           </Typography>
           <Typography className="text-muted-foreground font-medium mt-1">
             Gérez les demandes de contact • {messages.filter(m => !m.isRead).length} messages non lus
           </Typography>
        </div>
        <div className="relative w-full md:w-96">
          <InputReusable
            id="search"
            placeholder="Rechercher un message, expéditeur..."
            icon={IconSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            hideIcon={false}
          />
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 rounded-3xl bg-card/50 border border-border/40 space-y-4 animate-pulse">
              <div className="flex items-center gap-6">
                <div className="size-14 rounded-2xl bg-muted/40" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-muted/40 rounded-lg" />
                  <div className="h-4 w-48 bg-muted/40 rounded-lg opacity-50" />
                </div>
                <div className="h-6 w-20 bg-muted/40 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/40 rounded-lg" />
                <div className="h-4 w-2/3 bg-muted/40 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="size-20 rounded-3xl bg-muted/20 flex items-center justify-center text-muted-foreground">
            <IconInbox size={40} stroke={1.5} />
          </div>
          <div>
            <Typography variant="h3">Aucun message trouvé</Typography>
            <Typography className="text-muted-foreground">Votre boîte de réception est vide pour le moment.</Typography>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.isRead) handleMarkAsRead(message.id);
                }}
                className={cn(
                  "group relative cursor-pointer p-6 rounded-3xl border transition-all duration-300",
                  "hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.1)] hover:border-primary/20",
                  message.isRead 
                    ? "bg-card/50 border-border/40 grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100" 
                    : "bg-background border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                )}
              >
                {!message.isRead && (
                  <div className="absolute top-6 right-6 size-2 bg-primary rounded-full ring-4 ring-primary/20 animate-pulse" />
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <UserAvatar
                    firstName={message.fullName.split(' ')[0]}
                    lastName={message.fullName.split(' ')[1] || ""}
                    size={56}
                    className={cn(
                      "rounded-2xl shrink-0",
                      message.isRead && "grayscale opacity-70"
                    )}
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={cn("font-black text-lg tracking-tight", !message.isRead ? "text-foreground" : "text-muted-foreground")}>
                        {message.fullName}
                      </span>
                      <StatusBadge 
                        status={message.status === "pending" ? "pending" : message.status === "replied" ? "accepted" : "rejected"} 
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground overflow-hidden">
                      <span className="truncate">{message.email}</span>
                      <span className="shrink-0">•</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <IconClock size={14} />
                        {format(new Date(message.receivedAt), "dd MMM yyyy", { locale: fr })}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <Typography className="font-bold line-clamp-1">{message.subject}</Typography>
                    <Typography className="text-sm text-muted-foreground line-clamp-1 italic">
                      "{message.message}"
                    </Typography>
                  </div>

                  <div className="flex gap-2 shrink-0 self-end md:self-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                        if (!message.isRead) handleMarkAsRead(message.id);
                      }}
                      className="p-3 rounded-2xl bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <IconMail size={20} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="p-3 rounded-2xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <IconTrash size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Message Modal - Styled consistent with SubjectModal */}
      <Dialog.Root open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <AnimatePresence>
          {selectedMessage && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-[50%] top-[50%] z-[200] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] focus:outline-none"
                >
                  <div className="relative flex flex-col overflow-hidden rounded-[3rem] border border-border/50 bg-background shadow-2xl max-h-[90vh] w-full">
                    <div className="absolute -top-32 -right-32 size-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                    
                    {/* Fixed Header */}
                    <div className="flex justify-between items-center p-10 pb-6 bg-background/50 backdrop-blur-md border-b border-border/40 z-20">
                      <Dialog.Title asChild>
                        <div className="flex items-center gap-4">
                          <UserAvatar
                            firstName={selectedMessage.fullName.split(' ')[0]}
                            lastName={selectedMessage.fullName.split(' ')[1] || ""}
                            size={56}
                            className="rounded-2xl shrink-0"
                          />
                          <div>
                            <Typography variant="h2" className="text-2xl font-black">{selectedMessage.fullName}</Typography>
                            <Typography className="text-muted-foreground font-medium">{selectedMessage.email}</Typography>
                          </div>
                        </div>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="rounded-full p-3 text-muted-foreground hover:bg-muted transition-colors">
                          <IconX size={24} />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-10 pt-8 space-y-8 relative z-10 custom-scrollbar">
                      <div className="bg-muted/30 rounded-3xl p-6 border border-border/40 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                           <StatusBadge 
                             status={selectedMessage.status === "pending" ? "pending" : selectedMessage.status === "replied" ? "accepted" : "rejected"} 
                           />
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                          <IconClock size={14} />
                          Soumis le {format(new Date(selectedMessage.receivedAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                        </div>
                        <Typography variant="h3" className="mb-4 text-xl font-bold">{selectedMessage.subject}</Typography>
                        <Typography className="text-foreground leading-relaxed italic text-lg opacity-80 px-4 border-l-4 border-primary/20 whitespace-pre-wrap">
                          "{selectedMessage.message}"
                        </Typography>
                      </div>

                      <div className="space-y-6">
                        <Typography variant="h4" className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                          <IconArrowBackUp size={18} /> Répondre par email
                        </Typography>
                        <TextareaReusable 
                          id="reply"
                          placeholder="Tapez votre réponse ici..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={6}
                          className="rounded-3xl border-border/40 bg-muted/10 focus:bg-background transition-all"
                        />
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="p-8 border-t border-border/40 bg-muted/10 flex justify-end gap-3 z-20">
                       <Dialog.Close asChild>
                         <ButtonReusable variant="outline">
                           Fermer
                         </ButtonReusable>
                       </Dialog.Close>
                       <ButtonReusable 
                         onClick={handleReply}
                         isLoading={isReplying}
                         disabled={!replyText.trim()}
                         className="px-8 font-bold"
                         leftIcon={<IconSend size={18} />}
                       >
                         Envoyer la réponse
                       </ButtonReusable>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}

