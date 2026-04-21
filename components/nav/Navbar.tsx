"use client";
import Image from "next/image";
import Logo from "@/public/mah-logo.png";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CustomTranslateWidget } from "../widgets/CustomTranslateWidget";

export type MenuOption = {
  name: string;
  type: "link" | "dropdown";
  href?: string;
  position: "left" | "right";
  items?: {
    name: string;
    href: string;
    description: string;
  }[];
};

const options: MenuOption[] = [
  {
    name: "About",
    type: "link",
    href: "/about-us",
    position: "left",
  },
  {
    name: "Services",
    type: "dropdown",
    items: [
      {
        name: "Marriage",
        description:
          "We offer a variety of marriage services for your perfect day.",
        href: "/services/marriage",
      },
      {
        name: "Funeral",
        href: "/services/funeral",
        description: "Select one of many funeral packages to suit your needs.",
      },
      {
        name: "Facility Bookings",
        href: "/services/facility-bookings",
        description: "Book your preferred facility for your event.",
      },
      {
        name: "Mishka",
        href: "https://mishkasocialservices.org/",
        description:
          "Mishka is a social service that helps welcome newcomers, immigrants, and refugees to Canada.",
      },
      {
        name: "Zakaat Application",
        href: "/services/zakaat-application",
        description: "Apply for our Zakaat programs.",
      },
    ],
    position: "left",
  },
  {
    name: "Education",
    type: "dropdown",
    items: [
      {
        name: "Islamic Schools",
        href: "/programs/islamic-schools",
        description: "We offer a variety of Islamic schools for your child.",
      },
      {
        name: "Al Furqan School",
        href: "/programs/alfurqan-school",
        description: "Al Furqan School - Providing quality Islamic education with modern academic excellence.",
      },
      {
        name: "Hifz Program",
        href: "/programs/hifz-program",
        description: "Join our comprehensive Hifz program for systematic Quran memorization and spiritual growth.",
      },
      {
        name: "Classes",
        href: "/programs/classes",
        description:
          "Full list of current Halaqas, Islamic classes, Quran circles & much more.",
      },
    ],
    position: "left",
  },
  {
    name: "Events & Programs",
    type: "dropdown",
    items: [
      {
        name: "Volunteering",
        href: "/programs/volunteering",
        description: "Learn about our volunteering opportunities.",
      },
      {
        name: "Vendor Registration",
        href: "/programs/vendor-registration",
        description:
          "Register with us to sell your goods and services to the community!",
      },
      {
        name: "Youth Events & Programs",
        href: "/programs/youth-programs",
        description: "The Hafiz program, Summer programs & many more!",
      },
      {
        name: "Children's Events & Programs",
        href: "/programs/children-programs",
        description:
          "Focusing on fostering growth spiritually, emotionally & physically.",
      },
      {
        name: "Sister's Events & Programs",
        href: "/programs/sisters-programs",
        description:
          "Focusing on fostering growth spiritually, emotionally & physically.",
      },
      {
        name: "New Muslims",
        href: "/programs/new-muslims",
        description:
          "Helping you find resources, connect with the community & grow as an individual.",
      },
      {
        name: "Senior's Programs",
        href: "/programs/seniors-programs",
        description:
          "Finding resources, maintaining friendships, and growing with a community.",
      },
      {
        name: "Community Events",
        href: "/programs/community-events",
        description: "A hub for community & contribution.",
      },
    ],
    position: "right",
  },
  {
    name: "MAH Youth",
    type: "link",
    href: "/mah-youth",
    position: "right",
  },
  {
    name: "Mosques",
    type: "dropdown",
    items: [
      {
        name: "Hamilton Mountain Mosque",
        href: "/mosques/hamilton",
        description:
          "Our beautiful central mosque is the perfect place to connect with your faith.",
      },
      {
        name: "Umar Mosque",
        href: "/mosques/umar",
        description:
          "Our mosque located downtown, perfect for quick prayers and gatherings.",
      },
      {
        name: "Ancaster Mosque",
        href: "/mosques/ancaster",
        description: "Our upcoming mosque located in Ancaster.",
      },
    ],
    position: "right",
  },
  {
    name: "Contact Us",
    type: "link",
    href: "/contact-us",
    position: "right",
  },
];

export type NavbarProps = {
  className?: string;
  transparent?: boolean;
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  const isExternal = href?.startsWith("http");
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Navbar = ({ className, transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const fastScrollThreshold = 10; // Adjust this for how "fast" scrolling up needs to be
  const scrollDistanceThreshold = 100; // Minimum scroll distance from top to trigger hide/show logic

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollDistance = scrollTop - lastScrollTop;
      const isScrollingDown = scrollDistance > 0;

      // Only apply hide/show logic if scrolled beyond the threshold
      if (scrollTop > scrollDistanceThreshold) {
        if (isScrollingDown) {
          setIsVisible(false); // Hide on scroll down
        } else if (Math.abs(scrollDistance) > fastScrollThreshold) {
          setIsVisible(true); // Show only on fast scroll up
        }
      } else {
        setIsVisible(true); // Always show navbar near the top
      }

      setIsScrolled(scrollTop > 50);
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={cn(
        `fixed z-10 w-full text-white transition-all duration-300 sm:p-6 p-3`,
        transparent && isScrolled ? "bg-primary rounded-b-2xl" : "bg-primary",
        transparent && !isScrolled ? "bg-transparent" : "",
        isVisible ? "translate-y-0" : "-translate-y-full", // Toggle visibility based on scroll direction and speed
        className
      )}
    >
      <div className="sm:w-fit w-full flex justify-center">
        <Link href={"/"} className="w-fit">
          <div className="sm:w-[200px] w-[150px] md:w-[350px]">
            <Image src={Logo} alt="logo" width={350} height={100} style={{ width: "100%", height: "auto" }} />
          </div>
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 gap-y-4 justify-between items-center">
        <div className="flex-1 text-sm sm:text-base">
          <NavigationMenu delayDuration={150}>
            <NavigationMenuList className="sm:gap-8 gap-4 flex flex-wrap">
              {options.map((option) => (
                <NavLinkComponent key={option.name} option={option} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
      <div className="sm:invisible visible">
        <CustomTranslateWidget />
      </div>

      <div className="absolute top-0 sm:visible invisible transition right-0 z-10">
        <CustomTranslateWidget />
      </div>
    </div>
  );
};

export const NavLinkComponent = ({ option }: { option: MenuOption }) => {
  const isMahYouth = option.name === "MAH Youth";

  return option.type === "link" ? (
    <NavigationMenuItem key={option.name}>
      <NavigationMenuLink
        href={option.href}
        className={cn(
          "text-white",
          isMahYouth &&
            "bg-yPrimary text-white border-2 border-yAccent px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-yAccent hover:text-yPrimary transition"
        )}
      >
        {option.name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  ) : (
    <NavigationMenuItem key={option.name}>
      <NavigationMenuTrigger>{option.name}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {option.items?.map((component) => (
            <ListItem
              key={component.name}
              title={component.name}
              href={component.href}
            >
              {component.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
