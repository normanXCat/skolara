"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  IconArrowLeft,
  IconMessageCircle,
  IconSearch,
  IconSend,
} from "@tabler/icons-react";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { SkeletonReusable } from "@/components/ui/skeleton-reusable";
import InputReusable from "@/components/ui/input-reusable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ComposeMessageModal from "@/components/messaging/ComposeMessageModal";
import UserAvatar from "@/components/common/user-avatar";
import api from "@/lib/api-client";
import { toast } from "@/lib/toast-store";

type Conversation = {
  peer: { id: number; firstName: string; name: string; role: string; email: string };
  lastMessage: any;
  unreadCount: number;
};

type ThreadResponse = {
  peer: { id: number; firstName: string; name: string; role: string; email: string };
  messages: any[];
};

export function TeacherMessagesClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [selectedPeerId, setSelectedPeerId] = useState<number | null>(null);
  const [thread, setThread] = useState<ThreadResponse | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const [composeOpen, setComposeOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchConversations = async () => {
    setLoadingConversations(true);
    try {
      const res = await api.get<{ conversations: Conversation[] }>("/api/messages/conversations");
      if (res.success) {
        setConversations((res.data as any)?.conversations || []);
      } else {
        toast.error(res.error || "Erreur lors du chargement des conversations.");
      }
    } catch {
      toast.error("Erreur lors du chargement des conversations.");
    } finally {
      setLoadingConversations(false);
    }
  };

  const fetchThread = async (peerId: number) => {
    setLoadingThread(true);
    try {
      const res = await api.get<ThreadResponse>(`/api/messages/conversations/${peerId}`);
      if (res.success) {
        setThread(res.data as any);
      } else {
        toast.error(res.error || "Erreur lors du chargement de la conversation.");
      }
    } catch {
      toast.error("Erreur lors du chargement de la conversation.");
    } finally {
      setLoadingThread(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (searchParams.get("compose") !== "1") return;
    setComposeOpen(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("compose");
    const nextUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(nextUrl);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!selectedPeerId) return;
    fetchThread(selectedPeerId).then(() => fetchConversations());
  }, [selectedPeerId]);

  useEffect(() => {
    if (!thread) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [thread?.messages?.length]);

  const filteredConversations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return conversations;

    return conversations.filter((c) => {
      const peer = `${c.peer.firstName} ${c.peer.name}`.toLowerCase();
      const last = `${c.lastMessage?.subject || ""} ${c.lastMessage?.content || ""}`.toLowerCase();
      return peer.includes(q) || last.includes(q);
    });
  }, [conversations, searchQuery]);

  const handleSend = async () => {
    if (!selectedPeerId) return;
    const content = reply.trim();
    if (!content) return;

    setSending(true);
    try {
      const res = await api.post("/api/messages", {
        receiverId: selectedPeerId,
        subject: "",
        content,
      });

      if (!res.success) {
        toast.error(res.error || "Erreur lors de l'envoi.");
        return;
      }

      setReply("");
      await fetchThread(selectedPeerId);
      await fetchConversations();
    } catch {
      toast.error("Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative z-10 space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
        <div className="self-start lg:sticky lg:top-0">
          <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full">
            <CardContent className="p-5 h-full flex flex-col gap-4">
            <InputReusable
              id="teacher-messages-search"
              placeholder="Rechercher une conversation..."
              icon={IconSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="pt-1 flex-1 min-h-0">
              <Typography variant="overline" className="text-muted-foreground">
                Messages
              </Typography>

              <div className="mt-3 h-full overflow-y-auto overflow-x-hidden space-y-3 pr-1">
                {loadingConversations ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border border-border/30 bg-background/20 space-y-2"
                      >
                        <SkeletonReusable width="40%" height={10} />
                        <SkeletonReusable width="75%" height={10} />
                      </div>
                    ))}
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">Aucune conversation.</p>
                ) : (
                  filteredConversations.map((c) => {
                    const isSelected = selectedPeerId === c.peer.id;
                    const peerName = `${c.peer.firstName} ${c.peer.name}`;

                    return (
                      <button
                        key={c.peer.id}
                        type="button"
                        onClick={() => setSelectedPeerId(c.peer.id)}
                        className={`group relative w-full min-w-0 text-left p-3 rounded-2xl border transition-all overflow-hidden ${
                          isSelected
                            ? "border-primary/20 bg-primary/10"
                            : "border-border/40 bg-background/30 hover:bg-background/40 hover:border-primary/20"
                        }`}
                      >
                        <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-[0.07] text-primary pointer-events-none">
                          <IconMessageCircle size={64} strokeWidth={1} />
                        </div>
                        <div className="flex items-start gap-3">
                          <UserAvatar
                            firstName={c.peer.firstName}
                            lastName={c.peer.name}
                            size={40}
                            className={isSelected ? "ring-2 ring-primary/30" : ""}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm truncate font-black">
                                {peerName}
                              </p>
                              <span className="text-[10px] text-muted-foreground shrink-0">
                                {format(new Date(c.lastMessage.sentAt), "dd MMM", { locale: fr })}
                              </span>
                            </div>
                            <p className="text-xs mt-1 truncate text-foreground/85 font-medium">
                              {c.lastMessage?.content}
                            </p>
                            {c.unreadCount > 0 && (
                              <div className="mt-2">
                                <Badge className="rounded-full" variant="default">
                                  {c.unreadCount} non lu
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
            </CardContent>
          </Card>
        </div>

        <div className="self-start lg:sticky lg:top-0 lg:h-[calc(100vh-2rem)]">
          <Card className="rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl h-full">
            <CardContent className="p-0 h-full overflow-hidden flex flex-col">
              {!selectedPeerId ? (
                <div className="h-full min-h-[620px] lg:min-h-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <IconMessageCircle size={28} className="text-primary" />
                  </div>
                  <Typography variant="h3" className="text-xl font-black">
                    Selectionnez une conversation
                  </Typography>
                  <Typography variant="body" className="text-muted-foreground max-w-md mt-2">
                    Cliquez sur une personne a gauche pour ouvrir la discussion.
                  </Typography>
                </div>
              ) : (
                <>
                  <div className="px-7 py-6 border-b border-border/40 flex items-center gap-4">
                    <ButtonReusable
                      variant="outline"
                      size="sm"
                      leftIcon={<IconArrowLeft size={16} />}
                      onClick={() => {
                        setSelectedPeerId(null);
                        setThread(null);
                      }}
                    >
                      Retour
                    </ButtonReusable>
                    <div className="min-w-0">
                      <Typography variant="h3" className="text-lg font-black truncate">
                        {thread ? `${thread.peer.firstName} ${thread.peer.name}` : "Conversation"}
                      </Typography>
                      <p className="text-sm text-muted-foreground truncate">
                        {thread?.peer.role} • {thread?.peer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto overflow-x-hidden p-7 space-y-4 bg-gradient-to-b from-background/10 to-background/40">
                    {loadingThread ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-4 rounded-2xl border border-border/30 bg-background/20 space-y-2">
                            <SkeletonReusable width="55%" height={10} />
                            <SkeletonReusable width="85%" height={10} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      thread?.messages?.map((m) => {
                        const isMine = m.senderId !== thread.peer.id;
                        const avatar = (
                          <UserAvatar
                            firstName={isMine ? undefined : thread.peer.firstName}
                            lastName={isMine ? undefined : thread.peer.name}
                            size={34}
                          />
                        );

                        return (
                          <div key={m.id} className={`flex items-end gap-3 ${isMine ? "justify-end" : ""}`}>
                            {!isMine && avatar}
                            <div className={`max-w-[80%] rounded-3xl px-5 py-4 border ${
                              isMine
                                ? "bg-primary/10 border-primary/20"
                                : "bg-background border-border/40"
                            }`}>
                              <p className="text-xs font-bold text-muted-foreground mb-1">
                                {m.subject}
                              </p>
                              <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                {m.content}
                              </p>
                              <p className="mt-2 text-[10px] text-muted-foreground">
                                {format(new Date(m.sentAt), "dd MMM a HH:mm", { locale: fr })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={bottomRef} />
                  </div>

                  <div className="sticky bottom-0 z-10 p-5 border-t border-border/40 bg-background/70 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <InputReusable
                        id="teacher-reply"
                        placeholder="Ecrire un message..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        className="flex-1"
                      />
                      <ButtonReusable
                        leftIcon={<IconSend size={18} />}
                        onClick={handleSend}
                        disabled={sending || reply.trim().length == 0}
                        isLoading={sending}
                        loadingText="Envoi..."
                      >
                        Envoyer
                      </ButtonReusable>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ComposeMessageModal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSuccess={() => {
          setComposeOpen(false);
          fetchConversations();
        }}
      />
    </div>
  );
}
