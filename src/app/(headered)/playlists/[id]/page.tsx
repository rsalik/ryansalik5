'use client';

import LinkButton from '@/components/LinkButton';
import NavButton from '@/components/NavButton';
import Data from '@/data/data.json';

export default function Project({ params }: Readonly<{ params: { id: string } }>) {
  const { id } = params;

  const data = (Data as any).playlists[id as string];

  return (
    <div className="p-8 lg:p-16 flex flex-col-reverse lg:flex-row">
      <div className="grow">
        <h1 className="mt-4 lg:m-0 text-4xl lg:text-6xl font-display font-black">{data.name}</h1>
        <div className="flex mt-2">
          <NavButton id={id} type="playlists" prev />
          <NavButton id={id} type="playlists" />
        </div>
        <p className="text-lg mt-4">{data.description}</p>
      </div>
      <div className="lg:ml-8 lg:w-1/3">
        <div dangerouslySetInnerHTML={{ __html: data.embed }} />
      </div>
    </div>
  );
}
