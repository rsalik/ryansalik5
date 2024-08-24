import Data from '@/data/data.json';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Card from './Card';

export default function NavButton({
  id,
  type,
  prev = false,
}: Readonly<{
  id: string;
  type: string;
  prev?: boolean;
}>) {
  const keys = Object.keys((Data as any)[type]);

  // Horrifying!
  const nid = keys[(keys.findIndex((name) => name === id) + (prev ? -1 : 1) + keys.length) % keys.length];

  return (
    <div>
      <a
        href={`/${type}/${nid}`}
        className="rounded-full peer w-10 h-10 flex justify-center items-center border-orange-600 border-2 m-1 text-orange-600 hover:bg-orange-600 hover:text-slate-950 transition"
      >
        {prev ? <ArrowBack /> : <ArrowForward />}
      </a>
      <div className="peer-hover:z-10 -z-10 peer-hover:opacity-100 peer-hover:[transition:opacity_300ms_0ms_ease,_z-index_0ms_0ms_linear] [transition:opacity_300ms_0ms_ease,_z-index_0ms_300ms_linear] absolute duration-300 opacity-0">
        <Card name={nid} type={type} />
      </div>
    </div>
  );
}
