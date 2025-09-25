"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const DesktopButtons = () => (
  <div className="hidden md:flex items-center space-x-4">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Link href="/auth">
        <Button type="button" variant="outline" size="sm" className="text-foreground hover:cursor-pointer border shadow-elegant py-4">
          Login
        </Button>
      </Link>
    </motion.div>
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
     <Link href="/auth">
        <Button className="gradient-primary hover:cursor-pointer border-0 shadow-elegant">Get Started</Button>
      </Link>
    </motion.div>
  </div>
);
