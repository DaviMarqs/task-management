import { CardComponent } from "../components/Card";
import { Header } from "../components/Header";

export function Home() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-950 flex-col">
        <Header />

        <main className="grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-3">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </main>
      </div>
    </>
  );
}
