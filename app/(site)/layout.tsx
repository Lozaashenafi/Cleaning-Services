import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { db } from "@/db";
import { companyConfigs } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch config once at the top level
  const config = await db.query.companyConfigs.findFirst({
    where: eq(companyConfigs.id, 1)
  });

  return (
    <html lang="en">
      <body>
        <Navbar config={config} />
        {children}
        <Footer />
      </body>
    </html>
  );
}