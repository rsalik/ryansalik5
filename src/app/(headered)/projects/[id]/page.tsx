'use client';

import LinkButton from '@/components/LinkButton';
import NavButton from '@/components/NavButton';
import Data from '@/data/data.json';

export default function Project({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const data = (Data as any).projects[id as string];

  return (
    <div className="p-8 lg:p-16 flex flex-col-reverse lg:flex-row">
      <div className="max-w-2xl">
        <h1 className="mt-4 lg:m-0 text-4xl lg:text-6xl font-display font-black">{data.name}</h1>
        <div className="flex mt-2">
          <NavButton id={id} type="projects" prev />
          <NavButton id={id} type="projects" />
        </div>
        <p className="text-lg mt-4">{data.description}</p>
        <div className="mt-2 flex">
          <LinkButton href={data.repoLink}>View Repo</LinkButton>
          <div className="mx-1"></div>
          <LinkButton primary disabled={data.webLink.includes('heroku')} href={data.webLink}>
            View Project
          </LinkButton>
        </div>
        {data.webLink.includes('heroku') && (
          <p className="font-mono text-red-500 text-lg mt-1">Heroku has disabled free-tier dynos, so this project is no longer available online.</p>
        )}
      </div>
      <div className="grow lg:ml-8 lg:min-w-96 self-center flex justify-end">
        <img src={data.image} alt={data.name} className="lg:max-h-96 rounded-md object-contain" />
      </div>
    </div>
  );
}
