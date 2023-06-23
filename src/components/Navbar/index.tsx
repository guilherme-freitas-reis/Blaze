import { Box, Container } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

import NavbarOptions from "./NavbarOptions";
import { NavbarContainer } from "./styles";

function Navbar() {
  return (
    <NavbarContainer>
      <Container>
        <Link href={"/"}>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Image src="/logo.svg" alt="Blaze Logo" width={109} height={39} />
          </Box>

          <Box
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <Image
              src="/logo-mobile.svg"
              alt="Blaze Logo"
              width={24}
              height={30}
            />
          </Box>
        </Link>

        <NavbarOptions />
      </Container>
    </NavbarContainer>
  );
}

export default Navbar;
