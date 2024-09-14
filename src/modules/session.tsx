import React from "react";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ChevronRight,
  Clock10,
  Mic,
  NotepadText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card>;
type SessionType = "recording" | "transcription";
interface Session {
  patientName: string;
  patientId: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: SessionType;
}

const sessions = [
  {
    patientName: "John Doe",
    patientId: "1234567890",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "recording" as SessionType,
  },
  {
    patientName: "Jane Doe",
    patientId: "1234567891",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "transcription" as SessionType,
  },
  {
    patientName: "Jan Doe",
    patientId: "1234567892",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "transcription" as SessionType,
  },
];

const actionCards = [
  {
    title: "Record New Session",
    description: "Record a new session with a patient.",
    icon: <Mic size={20} className="text-white" />,
    link: "/session/create?type=recording",
  },
  {
    title: "Upload Transcript",
    description: "Upload a transcript file of completed sessions.",
    icon: <NotepadText size={20} className="text-white " />,
    link: "/session/create?type=transcription",
  },
];

const Session = ({ className, ...props }: CardProps) => {
  return (
    <>
      <div className="flex gap-4">
        <Card className={cn("flex-1", className)} {...props}>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Sessions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {sessions?.map((session) => (
              <SessionCard key={session.patientId} session={session} />
            ))}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <div className={cn("flex flex-col  gap-4 w-96")}>
          {actionCards.map((card) => (
            <Link href={card.link} key={card.title}>
              <Card
                key={card.title}
                className="border-none hover:ring-2 transition-all cursor-pointer duration-150 rounded-2xl p-4 ring-blue-500 ring-offset-2 shadow-none bg-blue-50"
              >
                <CardHeader className="p-0">
                  <div className="flex gap-4 justify-start items-start">
                    <div className="bg-blue-600 p-4 rounded-full">
                      {card.icon}
                    </div>
                    <div className="flex flex-col gap-2 my-auto">
                      <CardTitle className="text-gray-900">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="text-gray-700 font-medium">
                        {card.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const SessionCard = ({ session }: { session: Session }) => {
  return (
    <Card className="group rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-150 hover:shadow-none hover:bg-gray-50 hover:ring-offset-2 border p-4">
      <div key={session.patientId} className=" flex items-center space-x-4 ">
        <div className="flex-1 space-y-2">
          <CardTitle>{session.patientName}</CardTitle>
          <CardDescription className="font-medium text-xs flex gap-6">
            <span>{dayjs(session.sessionDate).format("MMMM D, YYYY")}</span>
            <span className="flex gap-2">
              <Clock10 size={16} className="text-black" />
              {session.sessionTime}
            </span>
            {session.sessionType === "recording" ? (
              <span className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Mic size={16} className="text-blue-600" />
                  </TooltipTrigger>
                  <TooltipContent>Recording</TooltipContent>
                </Tooltip>
              </span>
            ) : (
              <span className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <NotepadText size={16} className="text-blue-600" />
                  </TooltipTrigger>
                  <TooltipContent>Transcription File</TooltipContent>
                </Tooltip>
              </span>
            )}
          </CardDescription>
        </div>
        <span className="ml-auto my-auto opacity-0 group-hover:opacity-100 transition-all duration-150">
          <ChevronRight size={24} className="text-gray-600" />
        </span>
      </div>
    </Card>
  );
};

export default Session;
