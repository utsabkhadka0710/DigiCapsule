import CapsuleDetailsSection from "./components/capsule-details-section";
import { GetUserCapsulesAction } from "@/actions/fetch-capsules";
import TabsComponent from "./components/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PreviewNotice from "./components/preview-notice";

const Dashboard = async () => {
  const { data, session } = await GetUserCapsulesAction();

  const lockedCapsules = data
    ? data.filter((capsule) => capsule.status === "locked")
    : [];

  return (
    <div className=" mt-4 min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh]">
      <div>
        <CapsuleDetailsSection
          name={session?.user.name ?? "User"}
          capsuleDetails={{
            lockedCapsules: lockedCapsules.length,
            unlockedCapsules: data ? data.length - lockedCapsules.length : 0,
          }}
        />
      </div>

      <div className="mt-8 mb-4">
        <PreviewNotice />
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
