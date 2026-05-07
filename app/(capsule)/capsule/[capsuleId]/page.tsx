import { GetCapsuleByLink } from "@/actions/fetch-capsules";
import Capsule from "@/components/ui/capsule/capsule";
import CapsuleSideInfo from "@/components/ui/capsule/capsule-side-info";
import { Link2 } from "lucide-react";
import Link from "next/link";

const CapsulePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ capsuleId: string }>;
  searchParams: Promise<{ key: string }>;
}) => {
  const capsuleId = (await params).capsuleId;
  const key = (await searchParams).key;

  const fetchedCapsule = await GetCapsuleByLink({ capsuleId, key });

  if (!fetchedCapsule.data || !fetchedCapsule.success || !key) {
    return (
      <div className="flex h-96 items-center justify-center rounded-md border border-gray-700 bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">
          Capsule not found or invalid key.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-sm shadow-black/10 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
        >
          <Link2 className="h-5 w-5 text-sky-300" />
          <span>Visit DigiCapsule</span>
        </Link>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <Capsule
            title={fetchedCapsule.data.title}
            createdAt={fetchedCapsule.data.createdAt.toISOString()}
            unlockAt={fetchedCapsule.data.unlockAt.toISOString()}
            hint={fetchedCapsule.data.hint || undefined}
          />
        </div>
        <div className="w-full lg:w-auto lg:shrink-0">
          <CapsuleSideInfo
            createdAt={fetchedCapsule.data.createdAt.toISOString()}
            category={fetchedCapsule.data.category}
            creator={fetchedCapsule.data.creatorName || "Unknown"}
          />
        </div>
      </div>
    </>
  );
};
export default CapsulePage;
