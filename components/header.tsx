"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const links = [
  {
    title: "All Events",
    href: "/all-events",
  },
  {
    title: "Create Event",
    href: "/create-event",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

  return (
    <header className="fixed left-1/2 z-10 mx-auto mt-6 w-full -translate-x-1/2 rounded-lg px-6 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Home className="size-5 opacity-75 transition hover:opacity-100" />{" "}
              Welcome, {user ? user.given_name : null} <ChevronDown />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="space-y-6">
              <div>
                <DialogTitle className="mb-2">
                  You are about to log out
                </DialogTitle>
                <DialogDescription>
                  Click the Log out button to log out, or click Cancel to
                  continue browsing
                </DialogDescription>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-x-4">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button asChild variant="destructive">
                  <LogoutLink postLogoutRedirectURL="/">Log out</LogoutLink>
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <li key={link.title}>
                <Button
                  asChild
                  variant={`${link.href === pathname ? "secondary" : "default"}`}
                  size="sm"
                >
                  <Link href={link.href}>{link.title}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}