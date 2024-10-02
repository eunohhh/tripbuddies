import React from 'react';

type SearchPageTitleProps = {
  title: string;
  description: string;
};

const SearchPageTitle: React.FC<SearchPageTitleProps> = ({ title, description }) => {
  return (
    <section className="mt-2 mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-base text-gray-500">{description}</p>
    </section>
  );
};

export default SearchPageTitle;
