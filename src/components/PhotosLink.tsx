import { Outbound } from '@mui/icons-material';

export default function PhotosLink() {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <img
          src="/imgs/photo/p0.jpeg"
          alt="Photo 1"
          className="h-36 my-2 md:h-auto md:grow md:min-w-0 md:mx-2 object-cover rounded-md"
        />
        <img
          src="/imgs/photo/p1.jpeg"
          alt="Photo 1"
          className="h-36 my-2 md:h-auto md:grow md:min-w-0 md:mx-2 object-cover rounded-md"
        />
        <img
          src="/imgs/photo/p2.jpeg"
          alt="Photo 1"
          className="h-36 my-2 md:h-auto md:grow md:min-w-0 md:mx-2 object-cover rounded-md"
        />
      </div>
      <a
        href="https://photos.ryansalik.com"
        className="border-2 my-2 md:mx-2 border-slate-100 text-slate-100 h-24 md:h-36 md:grow md:min-w-90 font-mono text-xl md:text-5xl hover:bg-slate-100 hover:border-slate-100 hover:text-slate-950 transition flex justify-center items-center rounded-md"
      >
        View More <span className="mx-1 md:mx-2"></span>
        <Outbound fontSize="inherit" />
      </a>
    </div>
  );
}
