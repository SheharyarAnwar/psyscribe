import { ISessionNotes } from "@/app/types";
import { Textarea } from "@/components/ui/textarea";
import dayjs from "dayjs";

const getSessionDetails = async (sessionId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/api/sessions/${sessionId}`;
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
    return {}; // Return an empty array or appropriate default value
  }
};

export default async function SessionDetailsPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const sessionDetails = await getSessionDetails(params.sessionId);

  const notes = sessionDetails?.session?.notes as ISessionNotes;
  const sessionDate = sessionDetails?.session?.sessionDate;
  const clientFirstName = sessionDetails?.session?.client?.firstName;
  const clientLastName = sessionDetails?.session?.client?.lastName;

  return (
    <>
      <div className="flex flex-col gap-2 ml-auto">
        <h3>
          <span className="font-bold ">Client Name:</span> {clientFirstName}{" "}
          {clientLastName}
        </h3>
        <h3>
          <span className="font-bold ">Session Date:</span>{" "}
          {dayjs(sessionDate).format("MMM D, YYYY h:mm A")}
        </h3>
      </div>
      {Object.keys(notes).map((key) => (
        <InfoBox
          key={key}
          title={key}
          value={notes[key as keyof ISessionNotes]}
        />
      ))}
    </>
  );
}

const InfoBox = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold capitalize">{title}</h3>
      <Textarea
        value={value}
        contentEditable={false}
        rows={5}
        className="resize-none"
      />
    </div>
  );
};
