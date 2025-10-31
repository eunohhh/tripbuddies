import React from "react";

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
      <div className="mx-auto flex w-full max-w-lg items-center justify-center rounded-lg px-10 py-8">
        <span className="inline-flex rounded-md border bg-gray-200 p-1">
          <button
            type="button"
            className={`rounded px-2 py-1 ${selected === firstLabel ? "bg-gray-300" : ""}`}
            onClick={() => handleClick(firstLabel)}
          >
            {firstLabel}
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 ${selected === secondLabel ? "bg-gray-300" : ""}`}
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
