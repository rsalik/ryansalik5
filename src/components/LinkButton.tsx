export default function LinkButton({
  href,
  primary = false,
  disabled = false,
  children,
}: Readonly<{
  href: string;
  primary?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}>) {
  const colorString = disabled
    ? 'border-slate-600 striped text-slate-600 cursor-not-allowed pointer-events-none'
    : primary
    ? 'border-orange-600 text-orange-600 hover:text-slate-950 hover:bg-orange-600'
    : 'border-white text-white hover:text-slate-950 hover:bg-white';

  return (
    <a
      href={href}
      className={
        'rounded-md border-2 w-52 h-16 lg:w-64 lg:h-20 transition select-none my-4 text-lg lg:text-xl font-mono flex justify-center items-center ' +
        colorString
      }
    >
      <div>{children}</div>
    </a>
  );
}
