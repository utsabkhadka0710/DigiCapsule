import { checkSession } from "@/lib/helper/check-session";
import CapsuleDetailsSection from "./components/capsule-details-section";
import { GetUserCapsulesAction } from "@/actions/fetch-user-capsules";
import TabsComponent from "./components/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = async () => {
  const session = await checkSession(
    "You need to be logged in to access dashboard.",
  );

  const { data } = await GetUserCapsulesAction();

  const lockedCapsules = data
    ? data.filter((capsule) => capsule.status === "locked")
    : [];

  return (
    <div className=" mt-4 min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh]">
      <div>
        <CapsuleDetailsSection
          name={session.user.name}
          capsuleDetails={{
            lockedCapsules: lockedCapsules.length,
            unlockedCapsules: data ? data.length - lockedCapsules.length : 0,
          }}
        />
      </div>

      <div className="mt-8">
        <TabsComponent capsules={data || []} loading={!data} />
      </div>
      {!data ||
        (data.length === 0 && (
          <div className="flex flex-col gap-3 items-center justify-center mt-10">
            <p className="text-gray-500">No capsules found.</p>
            <Button asChild variant="outline">
              <Link href="/create">Create one</Link>
            </Button>
          </div>
        ))}
    </div>
  );
};
export default Dashboard;
