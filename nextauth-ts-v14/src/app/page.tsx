// import styles from "./page.module.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      This is a Landing Page, 
      {session ? (
        <span> After Sign-In</span>
      ) : (
        <span> Before Sign-In</span>
      )}
    </main>
  );
}
