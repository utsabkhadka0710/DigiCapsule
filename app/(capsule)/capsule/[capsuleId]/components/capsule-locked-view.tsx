import { GetCurrentPlanFromId } from "@/actions/user-details";
import Capsule from "@/components/ui/capsule/capsule";
import CapsuleSideInfo from "@/components/ui/capsule/capsule-side-info";

interface CapsuleLockedViewProps {
  title: string;
  createdAt: Date;
  unlockAt: Date;
  hint?: string;
  previewImageUrl?: string | null;
  category: string;
  creatorName: string;
  userId: string;
}

const CapsuleLockedView = async ({
  title,
  createdAt,
  unlockAt,
  hint,
  previewImageUrl,
  category,
  creatorName,
  userId,
}: CapsuleLockedViewProps) => {
  const checkPlan = await GetCurrentPlanFromId(userId);
  const isPreviewImageAvailable = checkPlan.data && checkPlan.data !== "free";

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <Capsule
          title={title}
          createdAt={createdAt.toISOString()}
          unlockAt={unlockAt.toISOString()}
          hint={hint || undefined}
          previewImageUrl={previewImageUrl || undefined}
          isPreviewImageAvailable={isPreviewImageAvailable}
        />
      </div>
      <div className="w-full lg:w-auto lg:shrink-0">
        <CapsuleSideInfo
          createdAt={createdAt.toISOString()}
          category={category}
          creator={creatorName}
        />
      </div>
    </div>
  );
};
export default CapsuleLockedView;
