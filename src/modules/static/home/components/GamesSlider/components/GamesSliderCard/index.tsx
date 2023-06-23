import React from "react";
import Link from "next/link";

import {
  GamesSliderCardContainer,
  GamesSliderCardDescription,
  GamesSliderCardName,
} from "./styles";

export interface GamesSliderCardProps {
  name: string;
  image: string;
  href: string;
  disabled?: boolean;
}

function GamesSliderCard(props: GamesSliderCardProps) {
  return (
    <Link href={props.disabled ? "" : props.href}>
      <GamesSliderCardContainer
        sx={{
          backgroundImage: `url(${props.image})`,
          cursor: props.disabled ? "not-allowed" : "pointer",
          opacity: props.disabled ? 0.3 : 1,
        }}
      >
        <GamesSliderCardName component={"h4"}>{props.name}</GamesSliderCardName>
        <GamesSliderCardDescription component={"p"}>
          Blaze Originais
        </GamesSliderCardDescription>
      </GamesSliderCardContainer>
    </Link>
  );
}

export default GamesSliderCard;
