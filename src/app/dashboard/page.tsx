"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import DashboardLayout from "@/components/admin/DashboardLayout";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/auth");
          return;
        }

        setLoading(false); 
      } catch (error) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default Index;
