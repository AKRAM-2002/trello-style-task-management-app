import LoginPage from '../app/signin/page'
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <LoginPage />
    </main>
  );
}
