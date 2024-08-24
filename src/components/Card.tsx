import Data from '@/data/data.json';

export default function Card({ name, type }: { name: string; type: string }) {
  const data = (Data as any)[type][name];

  return (
    <a
      href={`/${type}/${name}`}
      className="border-2 bg-slate-950 border-slate-800 p-2 md:p-4 md:w-96 box-border w-56 md:box-content
      m-1 rounded-lg items-start md:items-center transition hover:bg-slate-900 inline-flex flex-col md:flex-row"
    >
      <img className="h-52 w-52 md:h-40 md:w-40 rounded-md object-cover" src={data.image} alt="" />
      <div className="flex flex-col md:grow overflow-hidden pt-2 md:ml-3 md:pt-0 items-start self-stretch">
        <h3 className="text-lg md:text-2xl font-display font-semibold">{data.name}</h3>
        <p className="text-slate-400 text-ellipsis overflow-hidden text-xs md:text-sm mt-1 md:mt-2 line-clamp-4 md:line-clamp-5">
          {data.description}
        </p>
      </div>
    </a>
  );
}
