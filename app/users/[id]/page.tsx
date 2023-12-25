import FollowButton from '@/components/FollowButton/FollowButton';
import Messages from '@/components/Messages/Message';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import useSWR from 'swr';

interface Props {
  params: {
    id: string;
  };
}

// Fetcher function to get user data
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch user data');
//   }
//   return response.json();
// };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfile({ params }: Props) {
  // throw new Error('This is an error');
  // const user = await prisma.user.findUnique({ where: { id: params.id } });
  // const { data: user, error } = useSWR(`/api/users/`, fetcher);
  // const followers = await prisma.follows.findMany({ 
  //   where: { followerId: params.id },
  //   include : { user: true }
  // });
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      followedBy: {
        select: {
          follower: {
            select: {
              id: true,
              name: true,
              // Add other fields you want to select
            },
          },
        },
      },
      following: {
        select: {
          following: {
            select: {
              id: true,
              name: true,
              // Add other fields you want to select
            },
          },
        },
      },
    },
  });
  // console.log(followers);
  // Optional: Handle loading state
  // if (!user && !error) {
  //   return <div>Loading...</div>;
  // }

  // // Optional: Handle error state
  // if (error) {
  //   console.error('Error fetching user profile:', error);
  //   return <div>Error fetching user profile. Please try again later.</div>;
  // }

  // const { name, bio, image, id } = user ?? {};
  const { name, bio, image, id, followedBy, following } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img
        width={300}
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>
     
    <FollowButton targetUserId={params.id}/>

    {(followedBy ?? []).length > 0 && (
        <div>
          <h3>Followers</h3>
          <ul>
            {(followedBy ?? []).map((follower) => (
              <li key={follower.follower.id}>{follower.follower.name}</li>
            ))}
          </ul>
        </div>
      )}

    {(following ?? []).length > 0 && (
        <div>
          <h3>Following</h3>
          <ul>
            {(following ?? []).map((follows) => (
              <li key={follows.following.id}>{follows.following.name}</li>
            ))}
          </ul>
        </div>
        )}

    <Messages targetUserId={params.id}/>
    </div>
  );
}