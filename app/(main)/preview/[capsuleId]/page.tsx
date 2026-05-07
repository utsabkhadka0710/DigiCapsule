import { GetCapsuleFiles, GetCapsuleFromId } from "@/actions/fetch-capsules";
import BackToDashboard from "@/components/ui/shared/back-to-dashboard";
import OpenedCapsule from "@/components/ui/shared/opened-capsule";

import { isPreviewAvailable } from "@/lib/helper/is-preview-available";

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ capsuleId: string }>;
}) => {
  const capsuleId = (await params).capsuleId;

  const capsule = await GetCapsuleFromId({ capsuleId: capsuleId });
  let capsuleFiles;

  if (!capsule.data || capsule.data.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">No capsule found with the provided ID.</p>
      </div>
    );
  }

  if (capsule.data[0].status === "unlocked") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">This capsule is already unlocked.</p>
      </div>
    );
  } else if (!isPreviewAvailable(capsule.data[0].createdAt)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">
          This capsule is not available for preview.
        </p>
      </div>
    );
  }

  capsuleFiles = await GetCapsuleFiles({ capsuleId: capsuleId });

  const markdown = capsule.data?.[0]?.content ?? "No data found";
  const allFiles = capsuleFiles.data ?? [];
  const attachedMemories = allFiles.filter((file) => file.fileType === "image");
  const attachedDocuments = allFiles.filter(
    (file) => file.fileType !== "image",
  );

  return (
    <div className="min-h-[80vh] max-w-5xl mx-auto mb-5">
      {/* Back to dashboard */}
      <div className="pt-4 pb-3">
        <BackToDashboard />
      </div>
      {/* Preview content */}
      <OpenedCapsule
        markdown={markdown}
        attachedMemories={attachedMemories}
        attachedDocuments={attachedDocuments}
      />
    </div>
  );
};
export default PreviewPage;
