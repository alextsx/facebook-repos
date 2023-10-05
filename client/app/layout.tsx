import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import { Sidebar, Header } from "@/components/index";
import ReduxProvider from "@/components/ReduxProvider";
import styles from "./layout.module.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bootcamp app",
  description: "App created for coding bootcamp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div style={{ display: "flex" }}>
          <Sidebar style={{}} />
          <div className={styles.main}>
            <ReduxProvider>
              <Header className={styles.header} />
              <div className={styles.content}>{children}</div>
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
