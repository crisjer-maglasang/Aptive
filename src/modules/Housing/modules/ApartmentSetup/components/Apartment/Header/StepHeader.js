const StepHeader = ({ step, title }) => {
  return (
    <div className="flex flex-col px-6 py-6 border-b border-gray-200">
      <span className="text-gray-500 text-sm">Step {step}</span>
      <h1 className="font-bold text-xl">{title}</h1>
    </div>
  );
};

export default StepHeader;
