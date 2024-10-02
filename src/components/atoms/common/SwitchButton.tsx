import React from 'react';

const ExampleComponent: React.FC<{
  firstLabel: string;
  secondLabel: string;
}> = ({ firstLabel, secondLabel }) => {
  type LabelType = string;
  const [selected, setSelected] = React.useState<LabelType>(firstLabel);
  const handleClick = (value: LabelType) => {
    setSelected(value);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg px-10 py-8 mx-auto rounded-lg items-center justify-center flex">
        <span className="p-1 inline-flex border bg-gray-200 rounded-md">
          <button
            className={`px-2 py-1 rounded ${selected === firstLabel ? 'bg-gray-300 ' : ''}`}
            onClick={() => handleClick(firstLabel)}
          >
            {firstLabel}
          </button>
          <button
            className={`px-2 py-1 rounded ${selected === secondLabel ? 'bg-gray-300' : ''}`}
            onClick={() => handleClick(secondLabel)}
          >
            {secondLabel}
          </button>
        </span>
      </div>
    </div>
  );
};

export default ExampleComponent;
