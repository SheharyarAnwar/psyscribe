import Session from "@/modules/session";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home(props: any) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <>
      <Session user={user} />
    </>
  );
}
