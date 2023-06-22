import React from "react";
import { MdClose } from "react-icons/md";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Alert, Box, Button, IconButton, Typography } from "@mui/joy";
import { useRouter } from "next/router";

function PromotionalBanner() {
  const { push } = useRouter();
  const { isLoading, user } = useUser();

  const [open, setOpen] = React.useState(true);

  if (user || isLoading || !open) return null;

  function handleClickClaim() {
    push("/api/auth/login");
  }

  return (
    <Alert
      sx={{
        height: 50,
        borderRadius: 0,
      }}
      variant="solid"
      color="success"
      endDecorator={
        <IconButton variant="solid" size="sm" color="success">
          <MdClose size={22} onClick={() => setOpen(false)} />
        </IconButton>
      }
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Typography sx={{ color: "white" }} fontSize={"14px"} fontWeight="md">
          Cadastre-se e receba um bonus de $50 🔥
        </Typography>

        <Button variant="soft" onClick={handleClickClaim}>
          Receber
        </Button>
      </Box>
    </Alert>
  );
}

export default PromotionalBanner;
