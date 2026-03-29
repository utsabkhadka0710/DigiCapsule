import { checkSession } from "@/lib/helper/check-session";
import CapsuleDetailsSection from "./components/capsule-details-section";
import { GetUserCapsulesAction } from "@/actions/fetch-user-capsules";
import TabsComponent from "./components/tabs";
import Search from "./components/search";

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
        <div className="border-b-2 border-white/20 pb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <TabsComponent capsules={data || []} loading={!data} />
          <Search />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
