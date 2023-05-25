import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Page() {
    const user = await currentUser();
    if (!user) return <div>Not Logged In</div>
    return (
        <div className="min-h-screen bg-base-200 justify-center">
        <div className="flex justify-center items-center">Welcome to Chess {user?.firstName}. Play against?</div>
        <br/>
        <div className="flex flex-col w-full lg:flex-row">
        <div className="btn btn-active grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">Player</div> 
        <div className="divider lg:divider-horizontal">OR</div> 
        <div className="btn btn-active grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">Computer</div>
        </div>
        <br/>
        <Link href="/chess" className="flex justify-center items-center underline">Click Begin</Link>
        <a href="/statistics" className= "btn btn-primary">Statistics</a>
      </div>
    )
  }