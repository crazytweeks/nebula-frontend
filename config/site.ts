import IconSetting from "@icons/setting";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Nebula",
  description: "",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Attendance",
      href: "/attendance",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Time Table",
      href: "/timeTable",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Client",
      href: "/client",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: IconSetting,
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Attendance",
      href: "/attendance",
    },
    {
      label: "Time Table",
      href: "/timeTable",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    twitter: "https://twitter.com",
  },
};
