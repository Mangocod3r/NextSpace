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
import Users from '@/components/UserCard/Users'; // Adjust the import based on the actual path and structure

export default Users;