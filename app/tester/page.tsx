import Capsule from "@/components/ui/capsule/capsule";
import CapsuleSideInfo from "@/components/ui/capsule/capsule-side-info";

const Test = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <Capsule />
      </div>
      <div className="w-full lg:w-auto lg:shrink-0">
        <CapsuleSideInfo />
      </div>
    </div>
  );
};
export default Test;
