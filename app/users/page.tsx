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

import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard/Usercard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

interface User {
  id: string;
  name?: string | null | undefined;
  bio?: string | null | undefined;
  age?: number | null | undefined;
  email?: string | null | undefined;
  emailVerified?: Date | null | undefined;
  image?: string | null | undefined;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await prisma.user.findMany();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name ?? ''}
          age={user.age ?? null}
          image={user.image ?? null}
        />
      ))}
    </div>
  );
}
