import Link from 'next/link';

export default async function Blog() {
  const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/content`).then((res) =>
    res.json()
  );
  return (
    <div>
      <h1>Welcome to our Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}