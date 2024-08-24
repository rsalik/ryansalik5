'use client';

import Card from '@/components/Card';
import Landing from '@/components/Landing';
import PhotosLink from '@/components/PhotosLink';

import Data from '@/data/data.json';

export default function Home() {
  return (
    <>
      <Landing />
      <div className="w-screen min-h-screen px-8">
        <div className="flex justify-center">
          <div className="relative">
            <h1
              className="font-mono text-slate-600 py-3 text-6xl font-bold rotate-180 px-3 top-0 sticky"
              style={{ writingMode: 'vertical-rl' }}
            >
              01. Projects
            </h1>
          </div>
          <div className="grow flex flex-wrap justify-end md:justify-start content-start">
            {Object.keys(Data.projects).map((name) => (
              <Card key={name} name={name} type="projects" />
            ))}
          </div>
        </div>
        <div className="m-8 h-[2px] bg-slate-800"></div>
        <div className="flex justify-center">
          <div className="relative">
            <h1
              className="font-mono text-slate-600 py-3 text-6xl font-bold rotate-180 px-3 top-0 sticky"
              style={{ writingMode: 'vertical-rl' }}
            >
              02. Playlists
            </h1>
          </div>
          <div className="grow flex flex-wrap justify-end md:justify-start content-start">
            {Object.keys(Data.playlists).map((name) => (
              <Card key={name} name={name} type="playlists" />
            ))}
          </div>
        </div>
        <div className="m-8 h-[2px] bg-slate-800"></div>
        <div className="flex justify-center">
          <div className="relative">
            <h1
              className="font-mono text-slate-600 py-3 text-6xl font-bold rotate-180 px-3 top-0 sticky"
              style={{ writingMode: 'vertical-rl' }}
            >
              03. Photos
            </h1>
          </div>
          <div className="flex grow flex-wrap justify-end md:justify-start">
            <PhotosLink />
          </div>
          <div className="space hidden md:block md:w-[50rem]"></div>
        </div>
        <div className="m-8 h-[2px] bg-slate-800"></div>
        <div className="flex justify-center">
          <div className="relative">
            <h1
              className="font-mono text-slate-600 py-3 text-6xl font-bold rotate-180 px-3 top-0 sticky"
              style={{ writingMode: 'vertical-rl' }}
            >
              04. Contact
            </h1>
          </div>
          <div className="grow flex flex-wrap justify-end md:justify-start text-xl md:text-3xl md:px-4">
            <div className="flex flex-col">
              <div className="my-2">
                <span className="font-display font-bold">Email</span>:{' '}
                <a className="underline" href="mailto:ryansalik@princeton.edu">
                  ryansalik@princeton.edu
                </a>
              </div>
              <div>
                <span className="font-display font-bold">GitHub</span>:{' '}
                <a className="underline" href="https://github.com/rsalik">
                  rsalik
                </a>
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  );
}
