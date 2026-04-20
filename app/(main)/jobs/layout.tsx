import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Muslim Association of Hamilton",
  description:
    "Explore job opportunities and join the team at the Muslim Association of Hamilton.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
