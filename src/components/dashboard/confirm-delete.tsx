"use client";

interface Props {
  action: (formData: FormData) => Promise<void>;
  slug: string;
  label: string;
  context?: string;
  bordered?: boolean;
}

export function ConfirmDelete({
  action,
  slug,
  label,
  context,
  bordered = false,
}: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      {context && <input type="hidden" name="context" value={context} />}
      <button
        type="submit"
        className={
          bordered
            ? "font-mono text-xs px-3 py-1.5 border border-gray text-foreground-sec hover:text-red hover:border-red/50 transition-colors cursor-pointer"
            : "font-mono text-xs text-foreground-sec hover:text-red transition-colors cursor-pointer"
        }
      >
        delete
      </button>
    </form>
  );
}
