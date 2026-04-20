import { PrimaryLayout } from "@/components/layouts/PrimaryLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimaryLayout className="pt-60 sm:px-24 px-6 items-center flex flex-col justify-center h-full">
      {children}
    </PrimaryLayout>
  );
}
