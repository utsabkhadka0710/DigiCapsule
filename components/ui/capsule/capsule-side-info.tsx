import { MdLock } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

const CapsuleSideInfo = () => {
  return (
    <Card className="w-full gap-2 lg:w-[24rem]">
      <CardHeader className="gap-1">
        <CardTitle className="text-sm text-gray-300 font-bold md:text-lg">
          CAPSULE STATUS
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Capsule Status */}
        <div className="rounded bg-background p-3 text-foreground flex items-center gap-4 mb-3">
          <div className="bg-red-950 h-10 w-8 flex items-center justify-center rounded-md">
            <MdLock size={24} color="red" />
          </div>

          <div>
            <p className="font-medium">Locked</p>
            <p className="text-sm text-muted-foreground">
              Opens <span>Oct 24, 2026</span>
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="rounded bg-background p-3 text-foreground flex items-center gap-4 ">
          <div className="bg-blue-950 h-10 w-8 flex items-center justify-center rounded-md">
            <TbCategoryFilled size={24} color="cyan" />
          </div>

          <div>
            <p className="font-medium">Category</p>
            <p className="text-sm text-muted-foreground">Education</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CapsuleSideInfo;
