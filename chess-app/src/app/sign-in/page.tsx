import { SignIn } from "@clerk/nextjs/app-beta";


const Page = async () => {
  return (
    <section className='py-24'>
      <div className='container'>
        <div className='flex justify center'>
          <SignIn afterSignInUrl="game-type" />
        </div>
      </div>
    </section>
  )
}

export default Page