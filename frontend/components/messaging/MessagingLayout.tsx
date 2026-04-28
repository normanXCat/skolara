"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, Search, Send, Inbox, PenSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InputReusable from "@/components/ui/input-reusable";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";
import ComposeMessageModal from "@/components/messaging/ComposeMessageModal";

interface MessagingLayoutProps {
  userRole: "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
}

export default function MessagingLayout({ userRole }: MessagingLayoutProps) {
  const [view, setView] = useState<"INBOX" | "SENT">("INBOX");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const endpoint = view === "INBOX" ? "/api/messages/inbox" : "/api/messages/sent";
      const res = await api.get(endpoint);
      if (res.success) {
        setMessages((res.data as any).messages as any);
      }
    } catch (err) {
      toast.error("Erreur lors de la récupération des messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    setSelectedMessage(null);
  }, [view]);

  const markAsRead = async (msg: any) => {
     if (view === "INBOX" && !msg.isRead) {
        await api.patch(`/api/messages/${msg.id}/read`);
        fetchMessages(); // refresh the list to clear unread marker
     }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4 w-full max-w-7xl mx-auto">
      {/* Sidebar */}
      <Card className="w-64 flex-shrink-0 rounded-3xl overflow-hidden border">
        <div className="p-4 bg-slate-50 border-b flex flex-col gap-4">
          <Button onClick={() => setComposeOpen(true)} className="w-full flex items-center justify-center gap-2">
            <PenSquare className="w-4 h-4" />
            Nouveau message
          </Button>
        </div>
        <div className="p-2 space-y-1">
          <Button 
            variant={view === "INBOX" ? "secondary" : "ghost"} 
            className="w-full justify-start text-slate-700"
            onClick={() => setView("INBOX")}
          >
            <Inbox className="w-4 h-4 mr-2" />
            Boîte de réception
          </Button>
          <Button 
            variant={view === "SENT" ? "secondary" : "ghost"} 
            className="w-full justify-start text-slate-700"
            onClick={() => setView("SENT")}
          >
            <Send className="w-4 h-4 mr-2" />
            Messages envoyés
          </Button>
        </div>
      </Card>

      {/* Main Content Area */}
      <Card className="flex-1 rounded-3xl overflow-hidden border flex flex-col">
        {!selectedMessage ? (
          // Message List
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">
                {view === "INBOX" ? "Boîte de réception" : "Messages envoyés"}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Aucun message trouvé.
                </div>
              ) : (
                <div className="divide-y">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      onClick={() => {
                         setSelectedMessage(msg);
                         markAsRead(msg);
                      }}
                      className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col gap-1 ${view === "INBOX" && !msg.isRead ? "bg-blue-50/40" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm ${view === "INBOX" && !msg.isRead ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                           {view === "INBOX" ? `${msg.sender.firstName} ${msg.sender.name}` : `${msg.receiver.firstName} ${msg.receiver.name}`}
                        </span>
                        <span className="text-xs text-slate-500">
                          {format(new Date(msg.sentAt), "dd MMM à HH:mm", { locale: fr })}
                        </span>
                      </div>
                      <div className={`text-sm ${view === "INBOX" && !msg.isRead ? "font-semibold text-slate-800" : "text-slate-800"}`}>
                         {msg.subject}
                      </div>
                      <div className="text-sm text-slate-500 truncate mt-1">
                         {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Message View
          <div className="flex flex-col h-full">
             <div className="p-4 border-b bg-slate-50 flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>
                   Retour
                </Button>
                <div className="flex flex-col">
                   <h2 className="font-semibold text-lg text-slate-800">{selectedMessage.subject}</h2>
                   <div className="text-sm text-slate-500">
                      {view === "INBOX" ? "De :" : "À :"} 
                      <span className="font-medium text-slate-700 ml-1">
                         {view === "INBOX" ? `${selectedMessage.sender.firstName} ${selectedMessage.sender.name}` : `${selectedMessage.receiver.firstName} ${selectedMessage.receiver.name}`}
                      </span>
                      <span className="mx-2">•</span>
                      {format(new Date(selectedMessage.sentAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                   </div>
                </div>
             </div>
             <div className="p-6 flex-1 overflow-y-auto text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.content}
             </div>
          </div>
        )}
      </Card>

      <ComposeMessageModal 
         isOpen={composeOpen} 
         onClose={() => setComposeOpen(false)} 
         onSuccess={() => {
            setComposeOpen(false);
            if (view === "SENT") fetchMessages();
         }}
      />
    </div>
  );
}
