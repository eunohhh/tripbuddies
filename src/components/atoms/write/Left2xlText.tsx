import React from 'react';
import { twMerge } from 'tailwind-merge';

type Left2xlBoldTextProps = {
    text: string;
    className?: string;
};

export default function Left2xlBoldText({
    text,
    className,
}: Left2xlBoldTextProps) {
    return (
        <div>
            <p
                className={twMerge(
                    'text-2xl mt-2 ml-2 xl:text-4xl xl:mt-8 xl:ml-2 font-bold',
                    className,
                )}
            >
                {text}
            </p>
        </div>
    );
}
