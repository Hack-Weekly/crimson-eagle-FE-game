import Image from "next/image";

export default function Home() {
    return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <Image src="https://images.unsplash.com/photo-1619163413327-546fdb903195?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNoZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" height="300" width="300" className="max-w-sm rounded-lg shadow-2xl" alt="Chess"/>
    <div>
      <h1 className="text-5xl font-bold">Welcome to Checkmate in Five</h1>
      <p className="py-6">Test your skill against AI or other players in this realistic chess game</p>
      <a href="/game-type" className="btn btn-primary">Begin</a>
    </div>
  </div>
</div>
    )
  }