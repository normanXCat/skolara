"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import InputReusable from "@/components/ui/input-reusable";
import { NavLink } from "@/components/ui/nav-link";
import { Typography } from "@/components/ui/typography";
import WrapperSection from "@/components/wrapper-section";
import { IconChevronRight, IconHelp, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { faqData } from "./faq-data";

export default function FAQClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaq = useMemo(() => {
    if (!searchQuery) return faqData;
    const lowerQuery = searchQuery.toLowerCase();
    return faqData.filter(item =>
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <div className="relative bg-background min-h-screen selection:bg-primary/30 pt-12 pb-24 lg:pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <WrapperSection className="py-12">
        <div className="w-full max-w-4xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground/60 mb-12"
          >
            <NavLink href="/" variant="footer" size="sm">Accueil</NavLink>
            <IconChevronRight size={14} />
            <span className="text-foreground font-bold">FAQ</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm mb-6">
              <IconHelp className="size-4" />
              Centre d'aide
            </div>
            <Typography variant="h1" className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              Questions <span className="text-primary italic font-serif">Fréquentes</span>
            </Typography>
            <Typography variant="body" className="max-w-2xl mx-auto text-muted-foreground text-lg">
              Trouvez rapidement des réponses à vos questions concernant la scolarité, les inscriptions et le fonctionnement de notre établissement.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative z-10 max-w-2xl mx-auto mb-16"
          >
            <InputReusable
              id="faq-search"
              type="text"
              placeholder="Rechercher une question ou un mot-clé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={IconSearch}
              iconSize={22}
              inputClassName="text-lg pr-6"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="relative p-2 md:p-6 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-sm"
          >
            {filteredFaq.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="px-4 md:px-6 first:border-t-0 last:border-b-0">
                    <AccordionTrigger className="text-lg md:text-xl font-black tracking-tight text-foreground hover:no-underline text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-20 px-6">
                <div className="p-4 rounded-full bg-muted/20 inline-block mb-4 text-muted-foreground/30">
                  <IconSearch size={40} />
                </div>
                <Typography variant="h3" className="text-muted-foreground/50 font-black">
                  Aucun résultat pour "{searchQuery}"
                </Typography>
                <p className="text-muted-foreground/40 mt-2">
                  Essayez avec d'autres mots-clés ou contactez-nous directement.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground mb-4 font-medium italic">Vous n'avez pas trouvé votre réponse ?</p>
            <NavLink href="/contact" variant="footer" className="text-primary font-black text-lg">
              Contactez notre équipe administrative →
            </NavLink>
          </motion.div>
        </div>
      </WrapperSection>
    </div>
  );
}
