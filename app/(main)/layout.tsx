import { getSession } from "@/lib/helper/get-session";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  return (
    <>
      <div className="sticky top-0 z-100 bg-gray-900">
        <Header session={session} />
      </div>

      <main className="mx-auto px-4 md:max-w-11/12 lg:max-w-4/5">
        {children}
      </main>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
