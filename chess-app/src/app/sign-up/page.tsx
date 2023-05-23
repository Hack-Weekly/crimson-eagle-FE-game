import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/sign-in" routing="path" redirectUrl="game-type" />
  );

export default SignUpPage;