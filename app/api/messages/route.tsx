import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/utils/authOptions';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const { content, recipientId } = await req.json();

    const currentUserId = await prisma.user
      .findUnique({ where: { email: currentUserEmail } })
      .then((user) => user?.id!);

    const message = await prisma.message.create({
      data: {
        content,
        sender: { connect: { id: currentUserId } },
        recipient: { connect: { id: recipientId } },
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const recipientId = req.nextUrl.searchParams.get('targetUserId');

    const currentUser = await prisma.user.findUnique({
      where: { email: currentUserEmail },
    });

    const currentUserId = currentUser?.id!;

    if (!recipientId) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, recipientId: recipientId },
          { senderId: recipientId, recipientId: currentUserId },
        ],
      },
      orderBy: { timestamp: 'desc' },
      include: {
        sender: { select: { id: true, name: true } },
        recipient: { select: { id: true, name: true } },
      },
    });

    const formattedMessages = messages.map((message) => {
      const isCurrentUserSender = message.sender.id === currentUserId;
      const isCurrentUserRecipient = message.recipient.id === currentUserId;

      return {
        ...message,
        senderName: isCurrentUserSender ? 'You' : message.sender.name ?? 'Unknown Sender',
        recipientName: isCurrentUserRecipient ? 'You' : message.recipient.name ?? 'Unknown Recipient',
      };
    });

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

