
"use client";

import React from "react";
import { HeroMetrics } from "@/components/dashboard/HeroMetrics";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { InsightsGrid } from "@/components/dashboard/InsightsGrid";
import { ServicesHeatmap } from "@/components/dashboard/ServicesHeatmap";
import { MobileSheet } from "@/components/dashboard/MobileSheet";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { metrics, timeseries, activity, insightsData, servicesData } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function DashboardIndex() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho do seu negócio em tempo real</p>
      </motion.div>

      <FilterBar />
      <HeroMetrics metrics={metrics} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={timeseries} />
          <ServicesHeatmap data={servicesData} />
        </div>
        <div>
          <ActivityFeed activities={activity} />
        </div>
      </div>

      <InsightsGrid insights={insightsData} />
      <MobileSheet />
    </div>
  );
}
