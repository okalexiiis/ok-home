function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={`${i}-${part}`} className="text-foreground-sec">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      })}
    </>
  );
}

export function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\n+/);

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        const key = `${i}-${block.slice(0, 16)}`;

        if (block.startsWith("## ")) {
          return (
            <h2 key={key} className="font-mono text-lg text-purple mt-2">
              {block.slice(3)}
            </h2>
          );
        }

        return (
          <p key={key} className="font-serif text-foreground leading-relaxed">
            <InlineText text={block} />
          </p>
        );
      })}
    </div>
  );
}
