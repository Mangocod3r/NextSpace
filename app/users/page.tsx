// import UserCard from '@/components/UserCard/Usercard';
// import styles from './page.module.css';
// import { prisma } from '@/lib/prisma';

// export default async function Users() {
//   const users = await prisma.user.findMany();

//   return (
//     <div className={styles.grid}>
//       {users.map((user) => {
//         return <UserCard key={user.id} {...user} />;
//       })}
//     </div>
//   );
// }


// app/users/page.tsx

import UserCard from '@/components/UserCard/Usercard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

interface User {
  id: string;
  name?: string | null | undefined;
  age?: number | null | undefined;
  image?: string | null | undefined;
}

const Users = ({ users }: { users: User[] }) => {
  return (
    <div className={styles.grid}>
      {users && users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const users = await prisma.user.findMany();
    return {
      props: { users },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: { users: [] },
    };
  }
}

export default Users;
