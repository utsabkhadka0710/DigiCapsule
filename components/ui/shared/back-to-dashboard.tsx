import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BackToDashboard = () => {
  return (
    <div className="max-w-fit">
      <Link
        href={"/dashboard"}
        className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 text-center w-full"
      >
        <div className="flex items-center justify-center gap-2 text-lg font-medium text-primary hover:text-[#3b62fb]">
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </div>
      </Link>
    </div>
  );
};
export default BackToDashboard;
