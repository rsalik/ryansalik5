import { useState } from 'react';
import { NextPage } from 'next';
import ReactiveGrid from './ReactiveGrid';
import { ArrowDownward } from '@mui/icons-material';

const Landing: NextPage = () => {
  const [active, setActive] = useState(false);

  return (
    <ReactiveGrid setActive={setActive}>
      <div
        className={
          'absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center sm:text-left p-8 sm:p-16 select-none transition-colors duration-700 ' +
          (active ? 'text-black' : '')
        }
      >
        <h1 className="text-6xl font-display sm:text-8xl lg:text-[10rem] font-black">Ryan Salik</h1>
        <h2 className="text-xl font-display sm:text-3xl lg:text-4xl font-light mt-4">Department of Computer Science</h2>
        <h2 className="text-xl font-display sm:text-3xl lg:text-4xl font-light">Princeton University</h2>

        <div className="absolute left-0 right-0 bottom-20 sm:bottom-11 text-center" style={{ fontSize: '4rem' }}>
          <ArrowDownward fontSize="inherit" />
        </div>
      </div>
    </ReactiveGrid>
  );
};

export default Landing;
