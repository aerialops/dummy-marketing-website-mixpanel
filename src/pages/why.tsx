import { Background } from "~/components/background";
import { Header } from "~/components/header";

export default function Page() {
  return (
    <Background>
      <Header />
      <header className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
        <h1 className="text-6xl font-bold leading-tight">Because</h1>
        <p className="text-xl text-gray-600">We do cool stuff!</p>
        <button className="rounded-md bg-green-600 p-2 text-white">
          Button
        </button>
      </header>
    </Background>
  );
}
