import React from 'react';

type SearchPageChipsTitleProps = {
  title: string;
  limit: string;
};

const SearchPageChipsTitle: React.FC<SearchPageChipsTitleProps> = ({ title, limit }) => {
  return (
    <section>
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{limit}</p>
    </section>
  );
};

export default SearchPageChipsTitle;
