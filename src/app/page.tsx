import Image from "next/image";

import { Butcherman } from 'next/font/google';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const title = Butcherman({
  subsets: ['latin'],
  weight: "400"
});

export default function Home() {
  const groups = [
    { className: "bg-green-100", name: "Lobitos", description: "Gestão completa das atividades dos mais novos, acompanhando o crescimento e formação inicial." },
    { className: "bg-blue-100", name: "Junior", description: "Organização das patrulhas, planeamento de tarefas e registo do progresso dos escuteiros juniores." },
    { className: "bg-yellow-100", name: "Senior", description: "Controle de projetos, responsabilidades e acompanhamento do desenvolvimento dos escuteiros seniores." }
  ];

  return (
    <>
      <header className="bg-[#22906c] text-white h-screen w-screen">
        <section className="flex gap-5 px-5 md:px-20 lg:px-30 py-5 md:py-10">
          <div className="flex flex-col justify-center items-start gap-5 lg:w-4/6">
            <div className={`text-3xl lg:text-5xl ${title.className}`}>Bem vindo ao Escutivel</div>
            <div className={`text-lg lg:text-3xl ${title.className}`}>Gerência os teus escuteiros</div>
            <div className="lg:w-5/6">
              Uma plataforma completa para a gestão e organização de escuteiros.
              Facilite o acompanhamento de atividades, mantenha o registo dos membros
              e promova uma experiência moderna e colaborativa para todo o grupo.
            </div>
            <div className="my-2">
              <Link href="/login">
                <div className="w-full lg:min-w-[200px] p-1.5 border-2 border-white rounded-full">
                  <Button className="w-full rounded-full">
                    Entrar
                  </Button>
                </div>
              </Link>
            </div>
            <div className="">
              <div className="mb-2">Gerência</div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                {groups.map(it => (
                  <div className="border-2 border-white rounded-2xl p-2" key={it.name} >
                    <div className="bg-green-600 rounded-2xl p-2 flex flex-col gap-2 h-full">
                      <Badge className="bg-white text-black p-2 px-5 rounded-full border-none">
                        {it.name}
                      </Badge>
                      <div className="mt-2">{it.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Image src="/8439483_family_playing_together_activity_siblings_icon.png" alt="" width={700} height={700}/>
          </div>
        </section>
      </header>
    </>
  );
}
