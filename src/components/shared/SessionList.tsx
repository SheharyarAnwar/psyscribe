"use client";
import { SessionCard } from "@/modules/session";
import { useClientContext } from "./ClientListDropdown";

const SessionList: React.FC = () => {
  const { clientSessions: sessions } = useClientContext();

  return (
    <div>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-gray-500">
          <svg
            className="h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No sessions to show</p>
        </div>
      )}
    </div>
  );
};

export default SessionList;
