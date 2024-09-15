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
import { User } from "next-auth";
import ClientListDropdown, {
  ClientProvider,
} from "@/components/shared/ClientListDropdown";
import SessionList from "@/components/shared/SessionList";
import { ISession } from "@/app/types";

type SessionType = "recording" | "transcription";

interface SessionProps {
  user: User;
}

const sessions = [
  {
    clientName: "John Doe",
    clientId: "1234567890",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "recording" as SessionType,
  },
  {
    clientName: "Jane Doe",
    clientId: "1234567891",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "transcription" as SessionType,
  },
  {
    clientName: "Jan Doe",
    clientId: "1234567892",
    sessionDate: "2024-01-01",
    sessionTime: "10:00",
    sessionType: "transcription" as SessionType,
  },
];

const actionCards = [
  {
    title: "Upload Transcript",
    description: "Upload a transcript file of completed sessions.",
    icon: <NotepadText size={20} className="text-white " />,
    link: "/session/create?type=transcription",
  },
  {
    title: "Record New Session (Coming Soon)",
    description: "Record a new session with a patient.",
    icon: <Mic size={20} className="text-white" />,
    link: "/session/create?type=recording",
    disabled: true,
  },
];

const getClients = async (userId: string) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      `/api/clients?userId=${encodeURIComponent(userId)}`;
    console.log("Fetching from URL:", url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return []; // Return an empty array or appropriate default value
  }
};

const Session = async ({ user }: SessionProps) => {
  const clients = await getClients(user?.id);
  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <ClientProvider>
            <ClientListDropdown clients={clients} />
            <Card className={cn("flex-1")}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <SessionList />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </ClientProvider>
        </div>
        <div className={cn("flex flex-col  gap-4 w-96")}>
          {actionCards.map((card) => (
            <Link href={card.disabled ? "#" : card.link} key={card.title}>
              <Card
                key={card.title}
                className={cn(
                  {
                    "bg-blue-50": !card?.disabled,
                    "bg-gray-300 pointer-events-none cursor-not-allowed":
                      card?.disabled,
                  },
                  "border-none hover:ring-2 transition-all cursor-pointer duration-150 rounded-2xl p-4 ring-blue-500 ring-offset-2 shadow-none"
                )}
              >
                <CardHeader className="p-0">
                  <div className="flex gap-4 justify-start items-start">
                    <div
                      className={cn(
                        {
                          "bg-blue-600": !card?.disabled,
                          "bg-gray-400 pointer-events-none cursor-not-allowed":
                            card?.disabled,
                        },
                        " p-4 rounded-full"
                      )}
                    >
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

export const SessionCard = ({ session }: { session: ISession }) => {
  return (
    <Link href={`/session/${session._id}`}>
      <Card className="group rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-150 hover:shadow-none hover:bg-gray-50 hover:ring-offset-2 border p-4">
        <div key={session._id} className=" flex items-center space-x-4 ">
          <div className="flex-1 space-y-2">
            <CardTitle>
              {session.client.firstName} {session.client.lastName}
            </CardTitle>
            <CardDescription className="font-medium text-xs flex gap-6">
              <span>{dayjs(session.sessionDate).format("MMMM D, YYYY")}</span>
              {session.sessionTime && (
                <span className="flex gap-2">
                  <Clock10 size={16} className="text-black" />
                  {session.sessionTime}
                </span>
              )}
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
    </Link>
  );
};

export default Session;
