import {
  Bird,
  Rabbit,
  Settings,
  SquareLibrary,
  Triangle,
  Turtle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { AvatarIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Login } from "@/modules/login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavContext from "./misc/context";

const routes = [
  {
    href: "/",
    label: "Sessions",
    icon: SquareLibrary,
    key: "/",
  },
];

interface MainLayout extends React.PropsWithChildren {}
export async function MainLayout({ children }: MainLayout) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const username = `${user?.firstName} ${user?.lastName}`;
  let renderable = (
    <div className="grid h-screen w-full pl-[200px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r w-[196px]">
        <div className=" p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 mt-4">
          <>
            {routes.map((route) => (
              <Link key={route.key} href={route.href}>
                <Button
                  variant="ghost"
                  className="rounded-none h-12 w-full flex gap-2 justify-start bg-muted/50"
                >
                  <route.icon className="size-5" />
                  <span className=" font-medium">{route.label}</span>
                </Button>
              </Link>
            ))}
          </>
        </nav>
        <nav className="mt-auto grid gap-1 mb-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-none h-12 w-full flex gap-2 justify-start"
              >
                <AvatarIcon className="size-5" />
                <span className="font-medium">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavContext />
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </aside>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-700 py-8 px-4">
          Welcome back, {username}
        </h2>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-none">
          {children}
        </main>
      </div>
    </div>
  );

  if (!user) {
    renderable = (
      <>
        <Login />
      </>
    );
  }
  return <TooltipProvider>{renderable}</TooltipProvider>;
}
