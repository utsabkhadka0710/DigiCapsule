import { GetCapsuleByLink, GetCapsuleFiles } from "@/actions/fetch-capsules";
import Capsule from "@/components/ui/capsule/capsule";
import CapsuleSideInfo from "@/components/ui/capsule/capsule-side-info";
import { Link2 } from "lucide-react";
import Link from "next/link";
import CapsuleLockedView from "./components/capsule-locked-view";
import OpenedCapsule from "@/components/ui/shared/opened-capsule";

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

  const markdown = fetchedCapsule.data.content ?? "No data found";

  let capsuleFiles, attachedMemories, attachedDocuments;

  if (fetchedCapsule.data.status === "unlocked") {
    capsuleFiles = await GetCapsuleFiles({ capsuleId: fetchedCapsule.data.id });
    const allFiles = capsuleFiles.data ?? [];
    attachedMemories = allFiles.filter((file) => file.fileType === "image");
    attachedDocuments = allFiles.filter((file) => file.fileType !== "image");
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
      {/* Locked view */}

      {fetchedCapsule.data.status === "unlocked" ? (
        <OpenedCapsule
          markdown={markdown}
          attachedDocuments={attachedDocuments || []}
          attachedMemories={attachedMemories || []}
        />
      ) : (
        <CapsuleLockedView
          title={fetchedCapsule.data.title}
          createdAt={fetchedCapsule.data.createdAt}
          unlockAt={fetchedCapsule.data.unlockAt}
          hint={fetchedCapsule.data.hint || undefined}
          category={fetchedCapsule.data.category}
          creatorName={fetchedCapsule.data.creatorName || "Unknown"}
        />
      )}
    </>
  );
};
export default CapsulePage;
