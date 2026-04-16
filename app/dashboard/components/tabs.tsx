import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CapsuleType } from "@/lib/types/types";
import { IoIosLock } from "react-icons/io";
import { IoMdUnlock } from "react-icons/io";
import DashboardCapsule from "./capsule/dashboard-capsule";
import Search from "./search";

const triggers = [
  { value: "all", label: "All Capsules" },
  { value: "locked", label: "Locked", icon: <IoIosLock size={18} /> },
  { value: "unlocked", label: "Unlocked", icon: <IoMdUnlock size={18} /> },
];

const TabsComponent = ({
  capsules,
  loading,
}: {
  capsules: CapsuleType[];
  loading: boolean;
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const lockedCapsules = capsules.filter(
    (capsule) => capsule.status === "locked",
  );
  const unlockedCapsules = capsules.filter(
    (capsule) => capsule.status === "unlocked",
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <TabsList className="bg-gray-800 p-1 rounded-xl flex gap-2 w-fit">
          {triggers.map(({ value, label, icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="cursor-pointer text-md font-semibold data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
            >
              {icon}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <Search />
      </div>

      <div className="mt-4 border-b-2 border-white/20" />

      <TabsContent
        value="all"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {capsules.map((item) => (
          <DashboardCapsule key={item.id} capsule={item} />
        ))}
      </TabsContent>

      <TabsContent
        value="locked"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {lockedCapsules.map((item) => (
          <DashboardCapsule key={item.id} capsule={item} />
        ))}
      </TabsContent>

      <TabsContent
        value="unlocked"
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {unlockedCapsules.map((item) => (
          <DashboardCapsule key={item.id} capsule={item} />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
