import React from "react";
import { Button } from "@mui/joy";
import { useRouter } from "next/router";

import { BannerContainer, BannerDescription, BannerTitle } from "./styles";

function Banner() {
  const { push } = useRouter();

  function handleClickRegister() {
    push("/api/auth/login");
  }

  return (
    <BannerContainer>
      <BannerTitle component={"h1"}>
        Pacote de boas-vindas de $50 💸
      </BannerTitle>

      <BannerDescription component={"h2"}>
        Receba um bônus de até $50
      </BannerDescription>

      <Button
        onClick={handleClickRegister}
        sx={{
          width: "fit-content",
        }}
      >
        Cadastre-se
      </Button>
    </BannerContainer>
  );
}

export default Banner;
