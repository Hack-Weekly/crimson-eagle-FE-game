import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
    const user = await currentUser();
    if (!user) return <div>Not Logged In</div>
    return (
        <div>
        <div className="flex justify-center items-center">Welcome to Chess {user?.firstName}</div>
        <Link href="/chess" className="flex justify-center items-center underline">Click for a Game</Link>
        </div>
    )
  }