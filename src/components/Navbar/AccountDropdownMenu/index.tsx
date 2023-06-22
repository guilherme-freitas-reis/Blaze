/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import { MdPerson } from "react-icons/md";
import { Menu, MenuItem } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/router";

import { useWithdrawModal } from "@/modules/withdraw/store/withdrawModel.store";

import { AccountDropdownMenuButton } from "./styles";

interface OptionProps {
  label: string;
  onClick: () => void;
}

export default function AccountDropdownMenu() {
  const [open, setOpen] = React.useState(false);
  const actionRef = React.useRef<() => void | null>(null);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { push } = useRouter();
  const { handleOpen: handleOpenWithdrawModal } = useWithdrawModal();

  const options: OptionProps[] = [
    {
      label: "Conta",
      onClick: () => push("/account"),
    },
    {
      label: "Sacar",
      onClick: () => handleOpenWithdrawModal(),
    },
  ];

  return (
    <React.Fragment>
      <AccountDropdownMenuButton
        ref={anchorRef}
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onMouseDown={() => {
          // @ts-ignore
          actionRef.current = () => setOpen(!open);
        }}
        onKeyDown={() => {
          // @ts-ignore
          actionRef.current = () => setOpen(!open);
        }}
        onClick={() => {
          actionRef.current?.();
        }}
      >
        <MdPerson size={20} />
      </AccountDropdownMenuButton>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        {options.map((option) => (
          <MenuItem
            onClick={() => {
              option.onClick();
              setOpen(false);
            }}
            key={option.label}
            sx={{
              minWidth: "200px",
              fontSize: "12px",
            }}
          >
            {option.label}
          </MenuItem>
        ))}

        <Link href={"/api/auth/logout"}>
          <MenuItem
            sx={{
              minWidth: "200px",
              fontSize: "12px",
              mt: "32px",
            }}
          >
            Sair
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
