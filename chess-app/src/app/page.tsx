import { SignUp, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
    <div>
      <Link href="/sign-in">Sign In</Link>
    </div>
    <div>
      <Link href="/sign-up">Sign Up</Link>
    </div>
    </div>
  )
}