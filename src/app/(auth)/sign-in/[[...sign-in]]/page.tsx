import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen grid place-items-center">
      <SignIn />
    </div>
  );
}
