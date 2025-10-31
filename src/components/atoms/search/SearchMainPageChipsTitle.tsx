import React from "react";

type SearchPageChipsTitleProps = {
  title: string;
  limit: string;
};

const SearchPageChipsTitle: React.FC<SearchPageChipsTitleProps> = ({
  title,
  limit,
}) => {
  return (
    <section>
      <h2 className="font-semibold text-base">{title}</h2>
      <p className="text-gray-500 text-sm">{limit}</p>
    </section>
  );
};

export default SearchPageChipsTitle;
