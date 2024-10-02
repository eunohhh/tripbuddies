import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
  pending?: boolean;
};

export function SubmitButton({ children, pendingText, pending = false, ...props }: Props) {
  return (
    <button {...props} disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
