// pages/messages.tsx
// "use client"
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import { prisma } from '@/lib/prisma';

// interface Message {
//   id: string;
//   content: string;
//   sender: {
//     name: string;
//   };
// }

// interface Props {
//   targetUserId: string;
// }

// export default function Messages({ targetUserId }: Props) {


//     const [messages, setMessages] = useState<Message[]>([]); // Specify the type of messages as an array of Message
//     const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const session = await getServerSession(authOptions);
//         const currentUserEmail = session?.user?.email!;
//         const currentUserName = session?.user?.name!;
      
//         const currentUserId = await prisma.user
//           .findUnique({ where: { email: currentUserEmail } })
//           .then((user) => user?.id!);

//         const response = await fetch(`/api/messages/send?recipientId=${targetUserId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     if (session) {
//       fetchMessages();
//     }
//   }, [session, targetUserId]);

//   const sendMessage = async () => {
//     if (!newMessage || !targetUserId) {
//       return;
//     }

//     try {
//       await fetch(`/api/messages/send`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: newMessage,
//           recipientId: targetUserId,
//         }),
//       });

//       // Refetch messages after sending a new message
//       setNewMessage('');
//       // fetchMessages();
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Messages</h1>

//       {session ? (
//         <>
//           <h2>Welcome, {currentUserName}!</h2>

//           <ul>
//             {messages && messages.map((message) => (
//               <li key={message.id}>
//                 <strong>{message.sender.name}:</strong> {message.content}
//               </li>
//             ))}
//           </ul>

//           <label>
//             New Message:
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//           </label>

//           <button onClick={sendMessage}>Send Message</button>
//         </>
//       ) : (
//         <p>Please sign in to view and send messages.</p>
//       )}
//     </div>
//   );
// }


// pages/messages.tsx
// pages/messages.tsx
"use client"
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { timeStamp } from 'console';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
  };
  recipient: {
    id: string;
    name: string;
  };
  timestamp: string;
  senderName: string;
  recipientName: string;
}

interface Props {
  targetUserId: string;
}

export default function Messages({ targetUserId }: Props) {
  console.log(targetUserId);
  // const [session] = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  // const targetUserIdString = String(targetUserId);
  // if (!targetUserIdString) {
  //   console.error('Invalid targetUserId:', targetUserIdString);
  //   return;
  // }

  const fetchMessages = async () => {
    try {
      // const session = await getServerSession(authOptions);
      // console.log('------------');
      // console.log(session);
      // if(!session) return;

      // const currentUserEmail = session?.user?.email!;
      // const currentUserName = session?.user?.name!;

      // const user = await prisma.user
        // .findUnique({ where: { email: currentUserEmail } });
      // const currentUserName = user?.name;

      // if(!user) return;
      // console.log(user);
      // console.log(targetUserId);
      const response = await fetch(`/api/messages?targetUserId=${targetUserId}`, {
        method: 'GET',
        // body: JSON.stringify({ targetUserId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data);
      setMessages(data);
      console.log(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
      fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (!newMessage || !targetUserId) {
      return;
    }

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          recipientId: targetUserId,
        }),
      });

      // Refetch messages after sending a new message
      setNewMessage('');
      fetchMessages(); // Call the fetchMessages function here
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Messages</h1>

      {  (
        <>
          <h2>Welcome, !</h2>

          <ul>
            {messages && messages.map((message) => (
              <li key={message.id}>
              <strong>Sender:</strong> {message.senderName}, 
              <strong>Content:</strong> {message.content}, 
              <strong>Recipient:</strong> {message.recipientName},
              <p>{message.timestamp}</p>
            </li>
            ))}
          </ul>

          <label>
            New Message:
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </label>

          <button onClick={sendMessage}>Send Message</button>
          <button onClick={fetchMessages}>fetch Message</button>
        </>
      ) 
      }
    </div>
  );
}
