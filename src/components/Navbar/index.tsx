import { Container } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

import NavbarOptions from "./NavbarOptions";
import { NavbarContainer } from "./styles";

function Navbar() {
  return (
    <NavbarContainer>
      <Container>
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Blaze Logo" width={109} height={39} />
        </Link>

        <NavbarOptions />
      </Container>
    </NavbarContainer>
  );
}

export default Navbar;
