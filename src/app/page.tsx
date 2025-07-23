import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-5">
      <div className="w-100 flex justify-end gap-x-5">
        <UserButton />
        <ThemeToggle />
      </div>
      <div className="font-barlow font-bold text-blue-500">
        Hello world
        <Button variant={"default"}>Click Me</Button>
      </div>
    </div>
  );
}
