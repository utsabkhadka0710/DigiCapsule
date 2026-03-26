import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { IoMdLock } from "react-icons/io";
import TimerContainer from "./timer-container";

const Capsule = () => {
  return (
    <Card>
      <CardHeader className="place-items-center text-center">
        <div className="h-20 w-20 flex items-center justify-center bg-gray-700 border border-gray-400 rounded-full shadow-md md:h-28 md:w-28">
          <IoMdLock className="text-gray-300 text-5xl md:text-6xl" />
        </div>
        <CardTitle className="text-3xl font-bold mt-4 md:text-4xl lg:text-5xl">
          This is something interesting which is fun to read haha
        </CardTitle>

        <CardDescription>
          <div className="flex items-center justify-center mt-2">
            <span>Sealed on Mar 22, 2026 </span>
            <Dot />
            <span>Opening in 2027</span>
          </div>
        </CardDescription>

        <CardContent className="w-full md:max-w-3xl">
          <div className="mt-4 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            <TimerContainer value="364" label="DAYS" />
            <TimerContainer value="23" label="HOURS" />
            <TimerContainer value="59" label="MINUTES" />
            <TimerContainer value="59" label="SECONDS" />
          </div>

          <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800/60 p-4 text-left">
            <p className="text-sm font-semibold text-gray-200">Creators Hint</p>
            <p className="mt-1 text-sm text-gray-400 italic">
              Contains the video letters we recorded during freshman year behind
              the old gym. Don&apos;t open until after the ceremony.
            </p>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default Capsule;
