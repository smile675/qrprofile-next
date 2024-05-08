
import { Inter } from "next/font/google";
import "../globals.css";
import { ProfileNav } from "./_component/ProfileNav";
import { currentUser } from "@/lib/auth";


const inter = Inter({ subsets: ["latin"] });



export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
         <ProfileNav user={user}/> 
        <div>{children}</div>
      </body>
    </html>
  );
}
