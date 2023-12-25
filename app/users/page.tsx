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
// Assuming a generic user type, update this according to your user structure
type User = {
  id: string,
  name: string,
  age: number,
  image: string;
  // Other user properties...
};

import UserCard from '@/components/UserCard/Usercard';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

interface UsersProps {
  users: User[]; // Specify the type of the 'users' prop
}

export async function getServerSideProps() {
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
}

export default function Users({ users }: UsersProps) {
  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
