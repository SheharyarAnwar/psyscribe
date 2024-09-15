"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { LoaderCircle, Paperclip } from "lucide-react";
import {
  ClientProvider,
  useClientContext,
} from "@/components/shared/ClientListDropdown";

type Props = {};

const CreateSession = ({}: Props) => {
  const session = useSession();
  const params = useSearchParams();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [clientId, setClientId] = useState<string | null>(null);
  const sessionType = params.get("type");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      //@ts-ignore
      formData.append("userId", session.data?.user.id);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/api/clients/create", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        setClientId(data?.client._id);
        toast({
          title: "Client created",
          description: "Client created successfully",
          variant: "default",
        });
        setOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong while creating client",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while creating client",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  //TODO: use existing clients to create a session
  return (
    <>
      <Dialog open={open}>
        <DialogContent closeIcon={<></>}>
          <DialogHeader>
            <DialogTitle>Enter your client's details</DialogTitle>
            <DialogDescription>
              <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    autoComplete="off"
                    type="firstName"
                    name="firstName"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    autoComplete="off"
                    type="lastName"
                    name="lastName"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Create Client
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {sessionType === "recording" ? (
        <AudioRecorder />
      ) : (
        <TranscriptUpload clientId={clientId} />
      )}
    </>
  );
};

const AudioRecorder = () => {
  return <div>Audio Recorder</div>;
};

const TranscriptUpload = ({ clientId }: { clientId: string | null }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      if (file) {
        setLoading(true);
        const data = new FormData();
        data.append("file", file);

        // TODO: upload file to server here to get the generated response
        const res = {
          subjective: "Hello",
          objective: "World",
          assessment: "Hello",
          plan: "Gamma",
        };

        const session = {
          clientId: clientId,
          sessionDate: new Date(),
          sessionType: "transcription",
          notes: res,
        };

        if (res) {
          const response = await fetch("/api/sessions/create", {
            method: "POST",
            body: JSON.stringify(session),
          });
          if (response.ok) {
            const data = await response.json();
            const sessionId = data?.session._id;
            router.push(`/session/${sessionId}`);
            toast({
              title: "Session created",
              description: "Session created successfully",
              variant: "default",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong while creating session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {clientId ? (
        <div className="h-full w-full rounded-2xl flex justify-center items-center ">
          <form className="flex flex-col items-center gap-4">
            {loading ? (
              <>
                <LoaderCircle className="size-32 text-blue-500 animate-spin" />
              </>
            ) : (
              <Label htmlFor="tFile">
                <div className="relative bg-blue-500 rounded-full size-32 cursor-pointer flex justify-center items-center">
                  <Input
                    id="tfile"
                    onChange={handleFileChange}
                    type="file"
                    className="opacity-0 h-full w-full absolute left-0 top-0 cursor-pointer"
                  />
                  <Paperclip className="size-10 text-gray-50 font-bold" />
                </div>
              </Label>
            )}

            <div className=" font-medium text-gray-500 font-primary">
              Upload the transcript containing the conversation between you and
              your client
            </div>
          </form>
        </div>
      ) : (
        <p>Please create a client first</p>
      )}
    </>
  );
};

export default CreateSession;
