import type { InputHTMLAttributes, ReactNode } from "react";

export const inputClass =
  "h-12 w-full rounded-2xl border border-cocoa-800/15 bg-cream-50 px-4 text-[15px] text-cocoa-900 outline-none transition placeholder:text-cocoa-300 focus:border-leaf-600 focus:ring-4 focus:ring-leaf-600/15 user-invalid:border-red-500 user-invalid:ring-red-500/10";

export default function FormField({
  label,
  hint,
  error,
  className = "",
  children,
  ...input
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
  error?: string | null;
  children?: ReactNode;
}) {
  const id = input.id ?? input.name;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-cocoa-800">
        {label}
        {!input.required && <span className="ml-1 font-normal text-cocoa-500">(optional)</span>}
      </label>
      {children ?? (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClass}
          {...input}
        />
      )}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cocoa-500">{hint}</p>
      ) : null}
    </div>
  );
}
