"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import InputReusable from "@/components/ui/input-reusable";
import TextareaReusable from "@/components/ui/textarea-reusable";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { Typography } from "@/components/ui/typography";
import { toast } from "@/lib/toast-store";
import api from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { IconSearch, IconSend, IconUser, IconX } from "@tabler/icons-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ComposeMessageModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.get(`/api/messages/users/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.success) {
          setSearchResults((res.data as any) || []);
        }
      } catch (err) {
        toast.error("Erreur de recherche");
      } finally {
         setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
       toast.error("Veuillez sélectionner un destinataire.");
       return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/api/messages`, {
         receiverId: selectedUser.id,
         subject,
         content
      });

      if (res.success) {
        toast.success("Message envoyé avec succès !");
        // Reset state
        setSubject("");
        setContent("");
        setSelectedUser(null);
        setSearchQuery("");
        onSuccess();
      } else {
         toast.error(res.error || "Erreur d'envoi");
      }
    } catch (err) {
      toast.error("Erreur serveur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] focus:outline-none"
              >
                <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background shadow-2xl p-8 max-h-[85vh]">
                  <div className="absolute -top-32 -right-32 size-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title asChild>
                      <Typography variant="h3" className="font-black">
                        Nouveau message
                      </Typography>
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors">
                        <IconX size={20} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10 overflow-y-auto max-h-[calc(85vh-120px)] pr-1">
                    <div className="space-y-2 relative">
                      {selectedUser ? (
                        <div className="flex items-center justify-between p-4 border border-border/40 rounded-2xl bg-muted/20">
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">
                              {selectedUser.firstName} {selectedUser.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {selectedUser.role} - {selectedUser.email}
                            </span>
                          </div>
                          <ButtonReusable
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(null)}
                          >
                            Changer
                          </ButtonReusable>
                        </div>
                      ) : (
                        <div className="relative">
                          <InputReusable
                            id="searchQuery"
                            label="Destinataire"
                            placeholder="Rechercher par nom, email..."
                            value={searchQuery}
                            onChange={(e: any) => setSearchQuery(e.target.value)}
                            icon={IconSearch}
                          />
                          {isSearching && (
                            <Loader2 className="w-4 h-4 animate-spin absolute right-4 top-12 text-muted-foreground" />
                          )}
                        </div>
                      )}

                      {!selectedUser && searchResults.length > 0 && (
                        <div className="absolute top-[84px] left-0 right-0 z-20 bg-background border border-border/40 rounded-2xl shadow-xl max-h-52 overflow-y-auto backdrop-blur-xl">
                          {searchResults.map((user) => (
                            <div
                              key={user.id}
                              className="p-3 hover:bg-muted/30 cursor-pointer border-b border-border/20 last:border-0 transition-colors"
                              onClick={() => {
                                setSelectedUser(user);
                                setSearchResults([]);
                                setSearchQuery("");
                              }}
                            >
                              <div className="font-medium text-sm text-foreground flex items-center gap-2">
                                <IconUser size={14} className="text-primary" />
                                {user.firstName} {user.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {user.role} - {user.email}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <InputReusable
                      id="subject"
                      label="Sujet"
                      required
                      value={subject}
                      onChange={(e: any) => setSubject(e.target.value)}
                      placeholder="Sujet de votre message"
                    />

                    <TextareaReusable
                      id="content"
                      label="Contenu"
                      required
                      rows={6}
                      value={content}
                      onChange={(e: any) => setContent(e.target.value)}
                      placeholder="Redigez votre message ici..."
                    />

                    <div className="flex w-full flex-col gap-4 sm:flex-row pt-4 border-t border-border/40">
                      <ButtonReusable
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1"
                      >
                        Annuler
                      </ButtonReusable>
                      <ButtonReusable
                        type="submit"
                        disabled={loading || !selectedUser}
                        isLoading={loading}
                        loadingText="Envoi..."
                        leftIcon={<IconSend size={16} />}
                        className="flex-1"
                      >
                        Envoyer
                      </ButtonReusable>
                    </div>
                  </form>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
