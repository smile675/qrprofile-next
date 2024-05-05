
import { Inter } from "next/font/google";
import "../globals.css";
import { ProfileNav } from "./_component/ProfileNav";


const inter = Inter({ subsets: ["latin"] });



export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ProfileNav/> 
        <div>{children}</div>
      </body>
    </html>
  );
}
