import { currentUser } from "@clerk/nextjs";
import prisma from "../../client";
import UserData from "./UserData";
const DbTest = async () => {
  const user = await currentUser();
  const users = await prisma.user.findMany();

  return (
    <>
      <h1>All Users:</h1>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
      <hr />
      <UserData userId={user?.id} />
    </>
  );
};
export default DbTest;
