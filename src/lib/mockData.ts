/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
  sparkline?: number[];
  format?: "currency" | "number" | "percent";
}

export interface ActivityItem {
  id: string;
  type: "booking" | "payment" | "cancellation" | "review" | "message";
  title: string;
  description: string;
  time: string;
  meta: {
    user?: string;
    value?: number;
    rating?: number;
  };
  avatar?: string;
}

export interface TimeseriesDatapoint {
  date: string;
  revenue: number;
  bookings: number;
  users: number;
}

export const metrics: Metric[] = [
  {
    id: "revenue",
    label: "Receita Total",
    value: 124500,
    change: 12.5,
    trend: "up",
    sparkline: [1200, 1350, 1280, 1420, 1380, 1450, 1500],
    format: "currency",
  },
  {
    id: "users",
    label: "Usuários Ativos",
    value: 3120,
    change: 8.2,
    trend: "up",
    sparkline: [280, 290, 285, 295, 300, 310, 312],
    format: "number",
  },
  {
    id: "bookings",
    label: "Reservas",
    value: 412,
    change: 15.3,
    trend: "up",
    sparkline: [35, 38, 40, 39, 41, 40, 41],
    format: "number",
  },
  {
    id: "conversion",
    label: "Taxa de Conversão",
    value: 4.6,
    change: -2.1,
    trend: "down",
    sparkline: [4.8, 4.7, 4.9, 4.6, 4.5, 4.7, 4.6],
    format: "percent",
  },
];

export const timeseries: TimeseriesDatapoint[] = [
  { date: "2025-11-02", revenue: 12000, bookings: 35, users: 280 },
  { date: "2025-11-03", revenue: 14200, bookings: 42, users: 310 },
  { date: "2025-11-04", revenue: 13500, bookings: 38, users: 295 },
  { date: "2025-11-05", revenue: 16800, bookings: 48, users: 340 },
  { date: "2025-11-06", revenue: 15200, bookings: 45, users: 320 },
  { date: "2025-11-07", revenue: 18500, bookings: 52, users: 365 },
  { date: "2025-11-08", revenue: 17800, bookings: 50, users: 350 },
  { date: "2025-11-09", revenue: 19200, bookings: 55, users: 380 },
];

export const activity: ActivityItem[] = [
  {
    id: "1",
    type: "booking",
    title: "Nova Reserva Confirmada",
    description: "Spa Premium - Pacote Completo",
    time: "Há 2 horas",
    meta: { user: "Mariana Silva", value: 850 },
  },
  {
    id: "2",
    type: "payment",
    title: "Pagamento Recebido",
    description: "Transferência via Pix",
    time: "Há 3 horas",
    meta: { user: "Carlos Mendes", value: 320 },
  },
  {
    id: "3",
    type: "review",
    title: "Nova Avaliação",
    description: "Excelente atendimento!",
    time: "Há 5 horas",
    meta: { user: "Ana Costa", rating: 5 },
  },
  {
    id: "4",
    type: "booking",
    title: "Reserva Confirmada",
    description: "Massagem Relaxante",
    time: "Há 6 horas",
    meta: { user: "Pedro Santos", value: 180 },
  },
  {
    id: "5",
    type: "message",
    title: "Nova Mensagem",
    description: "Dúvida sobre horários disponíveis",
    time: "Há 8 horas",
    meta: { user: "Juliana Lima" },
  },
  {
    id: "6",
    type: "payment",
    title: "Pagamento Confirmado",
    description: "Cartão de Crédito",
    time: "Ontem às 18:30",
    meta: { user: "Roberto Alves", value: 450 },
  },
  {
    id: "7",
    type: "cancellation",
    title: "Reserva Cancelada",
    description: "Cliente solicitou reembolso",
    time: "Ontem às 15:20",
    meta: { user: "Fernanda Rocha", value: 200 },
  },
  {
    id: "8",
    type: "booking",
    title: "Nova Reserva",
    description: "Day Spa Completo",
    time: "Ontem às 12:45",
    meta: { user: "Lucas Oliveira", value: 680 },
  },
];

export const servicesData = [
  { service: "Spa Premium", seg: 12, ter: 15, qua: 18, qui: 14, sex: 22, sab: 28, dom: 20 },
  { service: "Massagem", seg: 8, ter: 10, qua: 12, qui: 9, sex: 15, sab: 18, dom: 14 },
  { service: "Estética", seg: 6, ter: 8, qua: 10, qui: 7, sex: 12, sab: 15, dom: 10 },
  { service: "Day Spa", seg: 4, ter: 5, qua: 6, qui: 5, sex: 8, sab: 12, dom: 9 },
];

export interface InsightCard {
  id: string;
  type: "stat" | "chart" | "list" | "progress";
  title: string;
  value?: string | number;
  subtitle?: string;
  trend?: number;
  data?: any;
}

export const insightsData: InsightCard[] = [
  {
    id: "peak-hours",
    type: "chart",
    title: "Horários de Pico",
    subtitle: "Reservas por hora",
    data: [
      { hour: "9h", value: 8 },
      { hour: "10h", value: 12 },
      { hour: "11h", value: 15 },
      { hour: "14h", value: 18 },
      { hour: "15h", value: 22 },
      { hour: "16h", value: 20 },
      { hour: "17h", value: 16 },
    ],
  },
  {
    id: "top-services",
    type: "list",
    title: "Serviços Mais Procurados",
    data: [
      { name: "Spa Premium", bookings: 85, revenue: 18700 },
      { name: "Massagem Relaxante", bookings: 72, revenue: 12960 },
      { name: "Day Spa", bookings: 45, revenue: 30600 },
      { name: "Estética Facial", bookings: 38, revenue: 9120 },
    ],
  },
  {
    id: "capacity",
    type: "progress",
    title: "Ocupação da Semana",
    value: 78,
    subtitle: "78% da capacidade",
    trend: 5.2,
  },
  {
    id: "satisfaction",
    type: "stat",
    title: "Satisfação",
    value: "4.8/5.0",
    subtitle: "Base: 127 avaliações",
    trend: 0.2,
  },
];
