import { UserButton, currentUser } from "@clerk/nextjs";
// import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
export default async function Dashboard() {
  const user = await currentUser();
  return (
    <div></div>
  );
}
