import React from "react";
import { Container, Divider, Grid } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

import {
  FooterContainer,
  FooterCopyright,
  FooterLink,
  FooterTitle,
} from "./styles";

function Footer() {
  return (
    <FooterContainer component={"footer"}>
      <Container>
        <Grid container>
          <Grid xs={12} md={4} sx={{ mb: 3 }}>
            <Link href={"/"}>
              <Image src="/logo.svg" alt="Blaze Logo" width={109} height={39} />
            </Link>
          </Grid>

          <Grid xs={12} md={4}>
            <FooterTitle>Links úteis</FooterTitle>

            <Link href={"/games/mines"}>
              <FooterLink>Mines</FooterLink>
            </Link>
            <FooterLink>Crash</FooterLink>
            <FooterLink>Double</FooterLink>
          </Grid>

          <Grid xs={12} md={4}>
            <FooterTitle>Sobre nós</FooterTitle>

            <FooterLink>Termos de Serviço</FooterLink>
            <FooterLink>Política de Privacidade</FooterLink>
            <FooterLink>Central de Apoio</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <FooterCopyright>
          © 2023 Feito com ❤️ por Guilherme Reis
        </FooterCopyright>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
