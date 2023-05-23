
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function Header () {
   
return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="normal-case text-xl">Checkmate in Five</div>
  </div>
  <div className="navbar-end">
  <UserButton afterSignOutUrl="/"/>
    <a href="/sign-in" className="btn">Sign In</a>
  </div>
</div>
)
}
