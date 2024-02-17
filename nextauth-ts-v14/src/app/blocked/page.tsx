import Link from "next/link";

export default function Blocked() {
  return (
    <main>
      <div>
        <div>Access Denied</div>
        <Link href="/">Return to Landing Page</Link>  
      </div>
    </main>
  )
}