"use client";

import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { IoMdLock } from "react-icons/io";
import TimerContainer from "./timer-container";
import { FaLightbulb } from "react-icons/fa";

interface CapsuleProps {
  title: string;
  createdAt: Date | string;
  unlockAt: Date | string;
  hint?: string;
}

const getTimeLeft = (unlockAt: Date | string) => {
  const difference = new Date(unlockAt).getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
};

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Capsule = ({ title, createdAt, unlockAt, hint }: CapsuleProps) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(unlockAt));

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft(unlockAt));
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, [unlockAt]);

  return (
    <Card>
      <CardHeader className="place-items-center text-center">
        <div className="h-20 w-20 flex items-center justify-center bg-gray-700 border border-gray-400 rounded-full shadow-md md:h-28 md:w-28">
          <IoMdLock className="text-gray-300 text-5xl md:text-6xl" />
        </div>
        <CardTitle className="text-3xl font-bold mt-4 md:text-4xl lg:text-5xl">
          {title}
        </CardTitle>

        <CardDescription>
          <div className="flex items-center justify-center mt-2">
            <span>Sealed on {formatDate(createdAt)}</span>
            <Dot />
            <span>Opening in {new Date(unlockAt).getFullYear()}</span>
          </div>
        </CardDescription>

        <CardContent className="w-full pb-20 md:max-w-3xl">
          {timeLeft.isExpired ? (
            <div className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6 text-center">
              <p className="text-2xl font-bold uppercase tracking-[0.35em] text-gray-200 md:text-3xl">
                soon.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
              <TimerContainer
                value={String(timeLeft.days).padStart(2, "0")}
                label="DAYS"
              />
              <TimerContainer
                value={String(timeLeft.hours).padStart(2, "0")}
                label="HOURS"
              />
              <TimerContainer
                value={String(timeLeft.minutes).padStart(2, "0")}
                label="MINUTES"
              />
              <TimerContainer
                value={String(timeLeft.seconds).padStart(2, "0")}
                label="SECONDS"
              />
            </div>
          )}

          {hint ? (
            <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800/60 p-4 text-left">
              <p className="text-sm font-semibold text-gray-200">
                Creators Hint
              </p>
              <p className="mt-3 text-sm text-gray-400 italic">{hint}</p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800/60 p-4 text-left">
              <p className="text-sm font-semibold text-gray-200">
                <FaLightbulb className="inline-block mr-1 text-blue-400" />
                No hint provided by the creator.
              </p>
              <p className="mt-3 text-sm text-gray-400 italic">
                "Try to guess what's inside the capsule!"
              </p>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default Capsule;
