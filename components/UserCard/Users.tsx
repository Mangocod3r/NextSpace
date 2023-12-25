// components/Users.tsx

import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard/Usercard';
import styles from './Users.module.css'; // Adjust the import based on the actual path and structure
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

interface UsersProps {
  users: User[];
}

export default function Users({ users }: UsersProps) {
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
