import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/global_components/NavBar";
import { currentUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qr Profile",
  description: "Digitalize your profile",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await currentUser()
  return ( 
    <html lang="en">
      <body className={inter.className}>
        <NavBar user={user}/>
        <div>{children}</div>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
