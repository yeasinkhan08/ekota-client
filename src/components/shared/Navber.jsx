"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
  HandHeart,
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  CalendarPlus,
  ClipboardList,
  Users,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

// Reusable user avatar component
function UserAvatar({ user, size = "h-9 w-9" }) {
  const [failedSrc, setFailedSrc] = useState("");

  const hasImage = user?.image && failedSrc !== user.image;

  if (hasImage) {
    return (
      <img
        src={user.image}
        alt={user.name || "User profile"}
        width={40}
        height={40}
        referrerPolicy="no-referrer"
        onError={() => setFailedSrc(user.image)}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400`}
    >
      <UserRound size={19} />
    </div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const checkingSession = !mounted || isPending;

  // Public navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/events" },
    { name: "About", href: "/about" },
  ];

  // Logged-in user navigation links
  const userLinks = [
    {
      name: "My Profile",
      href: "/profile",
      icon: UserRound,
    },
    {
      name: "Create Event",
      href: "/create-event",
      icon: CalendarPlus,
    },
    {
      name: "Manage Events",
      href: "/manage-events",
      icon: ClipboardList,
    },
    {
      name: "Joined Events",
      href: "/joined-events",
      icon: Users,
    },
  ];

  // Close all menus
  const closeMenus = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  // Toggle light and dark themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      closeMenus();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-800 text-white shadow-md shadow-green-900/15 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            <HandHeart size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-green-950 dark:text-green-400">
              Ekota<span className="text-green-700">.</span>
            </h1>

            <p className="text-[10px] font-medium tracking-[0.15em] text-gray-500 dark:text-gray-400">
              TOGETHER WE MAKE A DIFFERENCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-600 transition hover:text-green-800 dark:text-gray-300 dark:hover:text-green-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-green-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          )}

          {checkingSession ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800" />
          ) : user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1.5 pr-3 transition hover:bg-green-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <UserAvatar user={user} />

                <span className="max-w-28 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
                  {/* User Information */}
                  <div className="border-b bg-green-50/70 px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="h-10 w-10" />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Links */}
                  <div className="p-2">
                    {userLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
                        >
                          <Icon size={17} />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="border-t p-2 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-green-900 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-full bg-green-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-900"
              >
                Get Started
                <ArrowUpRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-green-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-800 transition hover:bg-green-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-100 bg-white px-5 py-6 shadow-lg dark:border-gray-800 dark:bg-gray-950 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {/* Public Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenus}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-400"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div className="mt-3 border-t border-gray-100 pt-5 dark:border-gray-800">
              {checkingSession ? (
                <div className="space-y-3">
                  <div className="h-12 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Checking session...
                  </p>
                </div>
              ) : user ? (
                <>
                  {/* Mobile User Information */}
                  <div className="mb-4 flex items-center gap-3 rounded-xl bg-green-50 p-3 dark:bg-gray-800">
                    <UserAvatar user={user} size="h-10 w-10" />

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Mobile User Links */}
                  {userLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMenus}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Icon size={18} />
                        {link.name}
                      </Link>
                    );
                  })}

                  {/* Mobile Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="rounded-full border border-green-800 py-3 text-center text-sm font-semibold text-green-900 dark:border-green-500 dark:text-green-400"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenus}
                    className="rounded-full bg-green-800 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
