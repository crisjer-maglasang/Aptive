import { FadeLoader } from 'react-spinners';

const LoaderControl = () => {
  return (
    <div className="absolute z-[2000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-md border-2 border-black/20">
      <FadeLoader
        color="#77856E"
        cssOverride={{ display: 'block', top: '38px', left: '42px' }}
      />
    </div>
  );
};

export default LoaderControl;
