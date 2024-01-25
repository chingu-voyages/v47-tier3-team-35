import { UserButton, currentUser } from "@clerk/nextjs";
// import NavigationDepthBar from "@/components/navigation/navigationDepthBar/NavigationDepthBar";
export default async function Navbar() {
    const user = await currentUser();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
            <UserButton showName={true} afterSignOutUrl="/sign-in" />
        </div>
    )
}