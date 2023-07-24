import React from "react";
import { Container, Grid } from "@mui/joy";

import { StatsProps } from "../types/stats.type";

import { StatsCard, Title } from "./styles";

function Stats(stats: StatsProps) {
  const blazeProfit = stats.totalBetsAmount - stats.totalUsersGains;

  return (
    <Container>
      <Title>Estatísticas do site</Title>

      <Grid spacing={2} container>
        <Grid xs={12} sm={4}>
          <StatsCard>
            <span>{stats.totalUsers}</span> <br />
            Usuários cadastrados
          </StatsCard>
        </Grid>

        <Grid xs={12} sm={4}>
          <StatsCard>
            <span>{stats.totalBets}</span> <br />
            Apostas realizadas
          </StatsCard>
        </Grid>

        <Grid xs={12} sm={4}>
          <StatsCard>
            <span>{stats.totalBetsWins}</span> <br />
            Apostas vencedoras
          </StatsCard>
        </Grid>

        <Grid xs={12} sm={4}>
          <StatsCard>
            <span>
              {stats.totalBetsAmount.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <br />
            Valor total de apostas
          </StatsCard>
        </Grid>

        <Grid xs={12} sm={4}>
          <StatsCard>
            <span>
              {stats.totalUsersGains.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <br />
            Wins dos usuários
          </StatsCard>
        </Grid>

        <Grid xs={12} sm={4}>
          <StatsCard>
            <span
              style={{
                color: blazeProfit > 0 ? "#4caf50" : "#f44336",
              }}
            >
              {blazeProfit.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </span>
            <br />

            {blazeProfit > 0 ? "Lucro da Blaze" : "Prejuízo da Blaze"}
          </StatsCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Stats;
