import Capsule from "@/components/ui/capsule/capsule";
import CapsuleSideInfo from "@/components/ui/capsule/capsule-side-info";

const Test = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <Capsule
          title="Test Capsule"
          createdAt={new Date().toISOString()}
          unlockAt={new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7,
          ).toISOString()}
        />
      </div>
      <div className="w-full lg:w-auto lg:shrink-0">
        <CapsuleSideInfo
          createdAt={new Date().toISOString()}
          category="Education"
          creator="John Doe"
        />
      </div>
    </div>
  );
};
export default Test;
