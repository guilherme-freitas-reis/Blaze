import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button } from "@mui/joy";
import { useRouter } from "next/router";

import { useDepositModal } from "@/modules/deposit/store/depositModel.store";
import BalanceWidget from "@/modules/wallet/views/BalanceWidget";

import AccountDropdownMenu from "./AccountDropdownMenu";

function NavbarOptions() {
  const { push } = useRouter();
  const { user, isLoading } = useUser();
  const { handleOpen } = useDepositModal();

  function handleClickLogin() {
    push("/api/auth/login");
  }

  function handleClickDeposit() {
    handleOpen();
  }

  if (isLoading) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
      }}
    >
      {user ? (
        <>
          <AccountDropdownMenu />
          <BalanceWidget />

          <Button onClick={handleClickDeposit}>Depositar</Button>
        </>
      ) : (
        <>
          <Button
            variant="plain"
            sx={{
              color: "#fff ",
              ":hover": {
                backgroundColor: "transparent",
                opacity: 0.8,
              },
            }}
            onClick={handleClickLogin}
          >
            Entrar
          </Button>
          <Button onClick={handleClickLogin}>Cadastre-se</Button>
        </>
      )}
    </Box>
  );
}

export default NavbarOptions;
