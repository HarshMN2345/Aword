
import { getServerSession } from 'next-auth';
import { authOptions, CustomSession } from './api/auth/[...nextauth]/options';
import NextHome from './home';


export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return <NextHome session={session} />;
}