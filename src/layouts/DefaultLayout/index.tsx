import React from "react";
import { Box } from "@mui/joy";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { ContentContainer } from "./styles";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <ContentContainer>
        <Box
          sx={{
            py: 6,
          }}
        >
          {children}
        </Box>

        <Footer />
      </ContentContainer>
    </>
  );
}

export default Layout;
