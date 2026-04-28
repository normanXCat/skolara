"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { ButtonReusable } from "@/components/ui/button-reusable";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { LayoutContext } from "@/components/layout/layout-wrapper";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const { navbar, footer } = useContext(LayoutContext);

  const isLayoutHidden =
    !!pathname &&
    (pathname === ROUTES.LOGIN ||
      pathname === ROUTES.PRE_REGISTRATION ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/teacher") ||
      pathname.startsWith("/student"));

  return (
    <>
      {isLayoutHidden && navbar}
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Decorative Grid Option */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="text-center max-w-2xl mx-auto space-y-8 z-10">
          {/* Floating 404 Number */}
          <motion.div
             initial={{ scale: 0.8, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             transition={{ type: "spring", stiffness: 200, damping: 20 }}
             className="relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
            <Typography 
              variant="display" 
              className="text-[6rem] md:text-[12rem] md:leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/30 drop-shadow-sm select-none"
            >
              404
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Typography variant="h2" className="text-3xl md:text-4xl font-extrabold">
              Page introuvable
            </Typography>
            <Typography variant="body" className="max-w-md mx-auto text-muted-foreground text-lg">
              Oups ! La page que tu cherches a peut-être été déplacée, supprimée ou n'a jamais existé.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <ButtonReusable 
              variant="default" 
              leftIcon={<IconArrowLeft size={18} />}
              onClick={() => router.back()}
            >
              Retour en arrière
            </ButtonReusable>
            <ButtonReusable 
              variant="outline" 
              href="/"
              leftIcon={<IconHome size={18} />}
              className="border-primary/20 bg-background/50 backdrop-blur-xl hover:bg-background/80"
            >
              Aller à l'accueil
            </ButtonReusable>
          </motion.div>
        </div>
      </div>
      {isLayoutHidden && footer}
    </>
  );
}
