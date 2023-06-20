import { Container, Button, Box } from "@mui/joy";
import { NavbarContainer } from "./styles";
import Image from "next/image";
import NavbarOptions from "./NavbarOptions";

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
