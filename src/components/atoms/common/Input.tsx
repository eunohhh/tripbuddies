'use client';
import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps, forwardRef, useId, useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

const InputVariants = cva(
  'flex h-10 w-full bg-gray-200 rounded-2xl border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-main-color focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      intent: false,
    },
    compoundVariants: [
      {
        intent: true,
        class:
          'file:border-2 file:border-dashed file:border-gray-300 file:bg-gray-100 file:text-gray-500',
      },
      {
        intent: false,
        class: 'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      },
    ],
  },
);

type InputVariant = VariantProps<typeof InputVariants>;

type InputProps = {
  type: 'password' | 'text' | 'file' | 'number';
  placeholder?: string;
  name?: string;
  className?: string;
  label?: string;
} & InputVariant &
  ComponentProps<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, intent, label = '', name, placeholder, ...props }: InputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
      <div
        className={twMerge(
          'relative flex items-center w-full flex-col',
          type === 'file' && 'absolute',
        )}
      >
        {label && (
          <label className="w-full text-left" htmlFor={id}>
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type === 'password' && showPassword ? 'text' : type}
          className={twMerge(InputVariants({ intent }), className, type === 'file' && 'hidden')}
          name={name}
          placeholder={placeholder}
          {...props}
        />
        {type === 'password' && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEye className="text-gray-500 text-xl" />
            ) : (
              <FaRegEyeSlash className="text-gray-500 text-xl" />
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
