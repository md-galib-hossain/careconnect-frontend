"use client"
import React, { useEffect, useState } from "react";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "../services/auth.services";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);


  return (
    <DashboardDrawer>{children}</DashboardDrawer>
  );
};

export default DashboardLayout;
