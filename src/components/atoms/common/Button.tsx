import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariant = cva(
  'rounded font-semibold transition hover:brightness-90 active:brightness-75',
  {
    variants: {
      intent: {
        primary: 'bg-primary-color-400',
        secondary: 'border-secondary-color',
        danger: 'border-red-500',
        onBoarding: 'w-[90%] h-[88px] bg-transparent font-semibold',
      },
      size: {
        sm: 'px-3 py-1 text-[13px]',
        md: 'px-4 py-1.5 text-[15px]',
        lg: 'px-5 py-2 text-[17px]',
      },
      variant: {
        selected: 'border-[#9E6B00] text-[#9E6B00]',
        unselected: 'text-white',
      },
    },
    compoundVariants: [
      {
        intent: 'onBoarding',
        variant: 'selected',
        className: 'border-[#9E6B00] text-[#9E6B00] bg-main-color/50',
      },
      {
        intent: 'onBoarding',
        variant: 'unselected',
        className: 'text-black',
      },
      // {
      //     intent: 'primary',
      //     variant: 'unselected',
      //     className: 'text-main-color',
      // },
      // {
      //     intent: 'secondary',
      //     variant: 'selected',
      //     className: 'bg-secondary-color',
      // },
      // {
      //     intent: 'secondary',
      //     variant: 'unselected',
      //     className: 'text-secondary-color',
      // },
      // { intent: 'danger', variant: 'selected', className: 'bg-red-500' },
      // {
      //     intent: 'danger',
      //     variant: 'unselected',
      //     className: 'text-red-500',
      // },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      variant: 'selected',
    },
  },
);

type ButtonVariantType = VariantProps<typeof buttonVariant>;

type ButtonProps = {
  selected?: boolean | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonVariantType &
  (({} & ComponentProps<'button'>) | ({ href: string } & ComponentProps<typeof Link>));

const Button = forwardRef(
  (
    {
      intent = 'primary',
      size = 'md',
      selected = false,
      children,
      onClick,
      className,
      ...props
    }: PropsWithChildren<ButtonProps>,
    ref,
  ) => {
    if ('href' in props) {
      return (
        <a
          className={twMerge(
            buttonVariant({
              intent,
              size,
              variant: selected ? 'selected' : 'unselected',
            }),
            className,
          )}
          {...props}
        >
          {children}
        </a>
      );
    } else {
      return (
        <button
          className={twMerge(
            buttonVariant({
              intent,
              size,
              variant: selected ? 'selected' : 'unselected',
            }),
            className,
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      );
    }
  },
);

Button.displayName = 'Button';

export default Button;
