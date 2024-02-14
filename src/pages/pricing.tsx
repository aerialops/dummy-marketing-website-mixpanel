import { Background } from "~/components/background";
import { Header } from "~/components/header";

export default function Page() {
  return (
    <Background>
      <Header />
      <header className="flex flex-grow flex-col items-center justify-center space-y-4 px-8 py-16 text-center">
        <h1 className="text-6xl font-bold leading-tight">Dummy text</h1>
        <p className="text-xl text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex placeat
          dolorum impedit molestiae eligendi, minima earum! Error recusandae
          perspiciatis voluptas eum! Officiis natus totam maiores optio aut
          alias consequuntur aliquam!
        </p>
      </header>
    </Background>
  );
}
