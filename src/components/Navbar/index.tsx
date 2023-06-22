import { Container } from "@mui/joy";
import Image from "next/image";

import NavbarOptions from "./NavbarOptions";
import { NavbarContainer } from "./styles";

function Navbar() {
  return (
    <NavbarContainer>
      <Container>
        <Image src="/logo.svg" alt="Blaze Logo" width={109} height={39} />

        <NavbarOptions />
      </Container>
    </NavbarContainer>
  );
}

export default Navbar;
