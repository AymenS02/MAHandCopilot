"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/mah-logo.png";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { DonateModal } from "@/components/modals/DonateModal";

export const Footer = ({ className }: { className?: string }) => {
  const dataTabs = [
    {
      title: "Our Services",
      id: "services",
      links: [
        { title: "Marriage", href: "/services/marriage" },
        { title: "Funeral", href: "/services/funeral" },
        { title: "Islamic Schools", href: "/programs/islamic-schools" },
      ],
    },
    {
      title: "Useful Links",
      id: "useful-links",
      links: [
        { title: "About Us", href: "/about-us" },
        { title: "Services", href: "/#services" },
        // Replace the Donate link with the modal trigger
        { title: "Donate", href: "https://donorchoice.ca/mountainmosque" },
      ],
    },
  ];

  const socials = [
    {
      title: "Facebook",
      href: "https://www.facebook.com/muslim.association.hamilton/",
      icon: <Facebook size={18} />,
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/hamiltonmosque/",
      icon: <Instagram size={18} />,
    },
    {
      title: "Twitter",
      href: "https://x.com/Muslim_Hamilton",
      icon: <Twitter size={18} />,
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/@Hamiltonmountainmosque",
      icon: <Youtube size={18} />,
    },
  ];

  return (
    <footer className={cn("bg-primary rounded-t-xl text-white w-full", className)}>
      <div className="lg:p-12 p-8 flex gap-6 gap-y-6 lg:flex-nowrap flex-wrap justify-between">
        <div className="space-y-3">
          <Image src={Logo} alt="logo" width={175} height={100} />
          <p className="max-w-lg">
            Welcome to MAH! A place of peace, spiritual growth, and community connection.
          </p>
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <a
                key={social.title}
                href={social.href}
                className="flex items-center space-x-2 text-primary bg-white w-fit p-1 rounded-full"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-16">
          {dataTabs.map((tab) => (
            <div key={tab.title}>
              <p className="lg:text-xl text-base font-semibold">{tab.title}</p>
              <ul>
                {tab.links.map((link) => (
                  <li key={link.title}>
                    {link.title === "Donate" ? (
                      <DonateModal
                        trigger={
                          <span className="text-white hover:underline cursor-pointer">
                            Donate
                          </span>
                        }
                      />
                    ) : (
                      <Link href={link.href}>{link.title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-md bg-white flex flex-col justify-between text-primary p-4 text-sm rounded-xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MessageCircle size={30} />
              <p className="text-xl">Get in touch</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <p>1545 Stone Church Rd E, Hamilton, ON L8W 3P8</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <a href="tel:+1-905-929-1526">+1 905-929-1526</a>
            </div>
          </div>
          <Link href={"/contact-us"} className="mt-4">
            <button className="w-full">Contact Us</button>
          </Link>
        </div>
      </div>
      <hr className="mt-4" />
      <p className="text-center flex flex-col justify-center p-4">
        © Copyright 2025 | All rights reserved
      </p>
    </footer>
  );
};
