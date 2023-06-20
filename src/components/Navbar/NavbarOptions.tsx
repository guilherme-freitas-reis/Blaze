import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button } from "@mui/joy";
import { useRouter } from "next/router";

function NavbarOptions() {
  const { push } = useRouter();
  const { user, isLoading } = useUser();

  function handleLogin() {
    push("/api/auth/login");
  }

  function handleLogout() {
    push("/api/auth/logout");
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
          <Button
            variant="plain"
            sx={{
              color: "#fff ",
              ":hover": {
                backgroundColor: "transparent",
                opacity: 0.8,
              },
            }}
            onClick={handleLogout}
          >
            Sair
          </Button>
          <Button>Depositar</Button>
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
            onClick={handleLogin}
          >
            Entrar
          </Button>
          <Button onClick={handleLogin}>Cadastre-se</Button>
        </>
      )}
    </Box>
  );
}

export default NavbarOptions;
