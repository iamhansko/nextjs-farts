'use client';

// import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { User } from "next-auth"

export default function Client() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client');
    }
  });

  return (
    <main>
      {session ? (
        <div>Hello {(session.user as User)?.name}, This is a Client Component</div>
      ) : ''}
    </main>
  );
}
