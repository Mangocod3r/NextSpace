// import { getServerSession } from 'next-auth'
// import styles from './page.module.css'
// import { redirect } from 'next/navigation';

// export default async function Home() {
//   try {
//     const session = await getServerSession();

//     console.log("hi");
//     console.log(session);

//     if (!session) {
//       redirect('/api/auth/signin');
//       return null; // Make sure to return something if there is no session
//     }

//     return (
//       <main>
//         {/* Your main content goes here */}
//       </main>
//     );
//   } catch (error) {
//     console.error('Error fetching session:', error);
//     return <div>Error fetching session</div>; // You might want to handle errors gracefully
//   }
// }
export default function Home() {
  return (
    <div>
      <h1>Welcome to NextSpace!</h1>
      <p>
        A next-gen social media app to connect with frens inspired by MySpace
      </p>
      <p>To get started, sign up for an account</p>
    </div>
  );
}