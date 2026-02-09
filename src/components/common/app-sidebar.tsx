"use client";

import Image from "next/image";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  Contact,
  CreditCard,
  LayoutGrid,
  LogOut,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import * as React from "react";

import { ThemeButton } from "@/src/components/common/theme-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { useLogout } from "@/src/features/auth/hooks/use-auth";
import { cn } from "@/src/core/utils/cn";
import Link from "next/link";

import { ROUTES } from "@/src/lib/constants/routes";

// ... existing imports ...

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const { mutate: logout } = useLogout();
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  const navItems = [
    {
      title: t("overview"),
      url: ROUTES.OVERVIEW,
      icon: LayoutGrid,
    },
    {
      title: t("guestList"),
      url: ROUTES.GUEST_LIST,
      icon: Users,
    },
    {
      title: t("promoters"),
      url: ROUTES.PROMOTERS,
      icon: Contact,
    },
    {
      title: t("events"),
      url: ROUTES.EVENTS,
      icon: CalendarDays,
    },
    {
      title: t("promotions"),
      url: ROUTES.PROMOTIONS,
      icon: Sparkles,
    },

  ];

  const user = {
    name: "Jane Doe",
    email: "jane@evenmatch.com",
    role: t("venueManager"),
    avatar: "/avatars/jane-doe.jpg",
    initials: "JD",
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl transition-all duration-500"
      {...props}
    >
      <SidebarHeader
        className={cn(
          "pt-8 pb-6 transition-all duration-500",
          isCollapsed ? "px-2" : "px-6"
        )}
      >
        <div className="flex items-center justify-between transition-all duration-500">
          <div
            className="flex items-center gap-4 cursor-pointer group/logo relative"
            onClick={() => isCollapsed && toggleSidebar()}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] dark:shadow-[0_0_20px_rgba(var(--primary),0.2)] relative overflow-hidden transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:rotate-3",
                isCollapsed ? "h-9 w-9 ml-0" : "h-11 w-11"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-50" />
              {isCollapsed && isLogoHovered ? (
                <SidebarTrigger className="h-5 w-5 text-white hover:bg-transparent p-0 z-10" />
              ) : (
                <div className={cn(
                  "relative z-10",
                  isCollapsed ? "h-5 w-5" : "h-6 w-6"
                )}>
                  <Image
                    src="/icon.png"
                    alt="Bouncinn Logo"
                    fill
                    className="object-contain brightness-110 contrast-110"
                  />
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0">
                <span className="text-2xl font-black tracking-tighter text-foreground whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-br from-foreground up-to-foreground/60 transition-all duration-300">
                  {t("brandName")}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 -mt-1 opacity-80">
                  BUSINESS
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          "transition-all duration-500 mt-4",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <SidebarMenu className="gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? item.title : undefined}
                  className={cn(
                    "h-11 w-full transition-all duration-300 rounded-xl relative group overflow-hidden",
                    isCollapsed ? "px-0 justify-center" : "px-4",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold"
                      : "text-muted-foreground/80 font-semibold hover:text-foreground hover:bg-muted/50 dark:hover:bg-zinc-900/50"
                  )}
                >
                  <Link href={item.url}>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20" />
                    )}
                    <item.icon
                      className={cn(
                        "shrink-0 transition-all duration-300 z-10",
                        isCollapsed ? "size-6" : "size-5",
                        isActive ? "text-white scale-110" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                      )}
                    />
                    {!isCollapsed && (
                      <span className="text-[13px] tracking-tight z-10 ml-1">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "mt-auto transition-all duration-500",
          isCollapsed ? "p-2" : "p-6"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent group/user"
            >
              <div
                className={cn(
                  "flex w-full items-center justify-between transition-all duration-500",
                  isCollapsed
                    ? "bg-transparent p-0 justify-center"
                    : "rounded-2xl bg-zinc-100/50 dark:bg-white/5 border border-border/40 p-3 hover:bg-zinc-100 dark:hover:bg-white/10 shadow-sm transition-all"
                )}
              >
                {!isCollapsed && (
                  <div className="flex items-center gap-3 overflow-hidden text-left">
                    <Avatar
                      className={cn(
                        "shrink-0 ring-2 ring-white dark:ring-zinc-800 shadow-xl transition-all duration-500 group-hover/user:scale-105",
                        "h-10 w-10 rounded-xl"
                      )}
                    >
                      <AvatarImage src={user.avatar} className="object-cover" />
                      <AvatarFallback className="text-[10px] font-black bg-primary/10 text-primary uppercase">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col truncate">
                      <span className="text-[13px] font-black text-foreground truncate leading-none mb-1.5 tracking-tight group-hover/user:text-primary transition-colors">
                        {user.name}
                      </span>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.15em] opacity-70">
                        {user.role}
                      </span>
                    </div>
                  </div>
                )}
                {isCollapsed && (
                  <Avatar
                    className={cn(
                      "shrink-0 ring-2 ring-white dark:ring-zinc-800 shadow-xl transition-all duration-500",
                      "h-8 w-8 rounded-lg"
                    )}
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-[10px] font-black bg-primary/10 text-primary">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                )}
                {!isCollapsed && <Settings className="h-3.5 w-3.5 text-muted-foreground group-hover/user:rotate-90 transition-transform duration-500" />}
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* DropdownMenuContent remains similar but with premium tweaks */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-2xl p-2 shadow-2xl border border-border/40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl"
            side={isMobile || isCollapsed ? "right" : "right"}
            align={isCollapsed ? "end" : "end"}
            sideOffset={12}
          >
            {/* ... dropdown content remains similar but styled ... */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-xl shadow-lg ring-2 ring-white dark:ring-zinc-800">
                  <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                  <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-black">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-foreground tracking-tight">
                    {user.name}
                  </span>
                  <span className="truncate text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-80">
                    {user.email}
                  </span>
                </div>
                <ThemeButton />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2 bg-border/40" />
            <DropdownMenuGroup className="px-1">
              <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer focus:bg-primary/10 focus:text-primary group transition-all duration-200">
                <Sparkles className="size-4 text-primary group-focus:scale-110 transition-transform" />
                <span className="font-bold text-[13px]">{t("upgradeToPro")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2 bg-border/40" />
            <DropdownMenuGroup className="px-1 space-y-0.5">
              <DropdownMenuItem asChild className="rounded-xl py-2.5 cursor-pointer focus:bg-accent group transition-all duration-200">
                <Link href={ROUTES.SETTINGS} className="flex items-center gap-2">
                  <Settings className="size-4 text-muted-foreground group-focus:text-foreground dark:group-focus:text-zinc-100 group-focus:rotate-45 transition-all" />
                  <span className="font-bold text-[13px] dark:text-zinc-300 dark:group-focus:text-white">{t("settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer focus:bg-accent group transition-all">
                <BadgeCheck className="size-4 text-muted-foreground group-focus:text-foreground dark:group-focus:text-zinc-100 transition-all" />
                <span className="font-bold text-[13px] dark:text-zinc-300 dark:group-focus:text-white">{t("account")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer focus:bg-accent group transition-all">
                <CreditCard className="size-4 text-muted-foreground group-focus:text-foreground dark:group-focus:text-zinc-100 transition-all" />
                <span className="font-bold text-[13px] dark:text-zinc-300 dark:group-focus:text-white">{t("billing")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-2.5 cursor-pointer focus:bg-accent group transition-all">
                <Bell className="size-4 text-muted-foreground group-focus:text-foreground dark:group-focus:text-zinc-100 transition-all" />
                <span className="font-bold text-[13px] dark:text-zinc-300 dark:group-focus:text-white">{t("notifications")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-2 bg-border/40" />
            <div className="px-1">
              <DropdownMenuItem
                className="rounded-xl py-2.5 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 font-bold text-[13px] transition-all"
                onClick={() => logout()}
              >
                <LogOut className="size-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
