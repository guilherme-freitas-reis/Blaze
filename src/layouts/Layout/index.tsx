import Navbar from "@/components/Navbar";
import { Box } from "@mui/joy";
import React from "react";
import { ContentContainer } from "./styles";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <ContentContainer>{children}</ContentContainer>
    </>
  );
}

export default Layout;
