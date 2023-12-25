import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/app/utils/authOptions';
import { NextRequest, NextResponse } from 'next/server';

const posts = [
  {
    title: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    title: 'Dolor Sit Amet',
    slug: 'dolor-sit-amet',
    content:
      'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
  },
  {
    title: 'Consectetur Adipiscing',
    slug: 'consectetur-adipiscing',
    content:
      'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
  },
  {
    title: 'Integer Nec Odio',
    slug: 'integer-nec-odio',
    content:
      'Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.',
  },
  {
    title: 'Praesent Libero',
    slug: 'praesent-libero',
    content:
      'Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.',
  },
];

export async function GET(req: NextRequest, res: NextResponse) {
  try {

    // const session = await getServerSession(authOptions);

    // Check for authentication here if needed
    // if (!session) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    return NextResponse.json(posts);
    // return res.status(200).json(posts);
  } catch (error) {
    console.error('Error in API route:', error);
    // return res.status(500).json({ error: 'Internal Server Error' });
  }
}
