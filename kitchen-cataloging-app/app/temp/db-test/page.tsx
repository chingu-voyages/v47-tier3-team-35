// e.g. in `pages/index.tsx`
import prisma from "../../../prisma/client";


const DbTest = async () => {
    const users = await prisma.user.findMany();

    return (
        <ul>
            {users.map((user, i) => (
                <li key={i}>{user.firstName} { user.lastName}</li>
            ))}
        </ul>
    );
};

export default DbTest;
