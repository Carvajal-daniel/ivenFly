import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function MobileSheet() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <>
      {/* FAB - Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 lg:hidden z-40"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-glow bg-gradient-primary hover:scale-110 transition-transform"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Quick Filters Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden fixed bottom-24 right-6 z-40 shadow-elegant"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Filtros Rápidos</SheetTitle>
            <SheetDescription>
              Ajuste a visualização dos dados do dashboard
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <Label>Período</Label>
              <RadioGroup value={timeRange} onValueChange={setTimeRange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="7d" id="7d" />
                  <Label htmlFor="7d" className="font-normal cursor-pointer">
                    Últimos 7 dias
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30d" id="30d" />
                  <Label htmlFor="30d" className="font-normal cursor-pointer">
                    Últimos 30 dias
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90d" id="90d" />
                  <Label htmlFor="90d" className="font-normal cursor-pointer">
                    Últimos 90 dias
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>

            <Button className="w-full bg-gradient-primary">
              Aplicar Filtros
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
