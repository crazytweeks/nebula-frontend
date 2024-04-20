import NextLink from "next/link";
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";

import SignIn from "@/app/sign-in";
import SignOut from "@/app/sign-out";
import { Logo, LogoIconOnly } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@app/api/test/route";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import NavSearch from "./navSearch";
import Notifications from "./notifications";

type Props = {
  isAuthenticated: boolean;
  user?: User;
};

export const Navbar = async ({ user, isAuthenticated }: Props) => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <LogoIconOnly
              className="
              duration-300

              ease-in-out hover:scale-110 hover:shadow-2xl hover:transition lg:hidden
            "
              size={24}
            />
            <Logo
              className="
              hidden
              duration-300
              ease-in-out hover:scale-110 hover:shadow-2xl hover:transition lg:block
            "
              size={64}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={cn(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:font-medium data-[active=true]:text-primary",

                  "hover:text-primary hover:underline hover:decoration-primary/30 hover:decoration-2 hover:underline-offset-4",
                  "duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:transition"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}

                {item.icon && <item.icon className="ml-1 h-6 w-6" />}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden basis-1 pl-4 lg:flex" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Notifications />
        </NavbarItem>
        <NavbarItem>
          <NavSearch />
        </NavbarItem>
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                isBordered
                color="success"
                icon={<AvatarIcon />}
                src={user?.picture ?? "/no-image.svg"}
                alt={user?.name ?? "avatar"}
              >
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {isAuthenticated ? (
                  <SignOut
                    onSignOut={async () => {
                      "use server";

                      // await signOut(logtoConfig);
                    }}
                  />
                ) : (
                  <SignIn
                    onSignIn={async () => {
                      "use server";

                      // await signIn(logtoConfig);
                    }}
                  />
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
        <ThemeSwitch />
        <Notifications />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavSearch />
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
