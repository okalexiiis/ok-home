interface IFooterProps {
  color: string;
}

export function Footer({ color }: IFooterProps) {
  const colors_map: Record<string, string> = {
    blue: "text-blue",
    red: "text-red",
    green: "text-green",
    purple: "text-purple",
    yellow: "text-yellow",
    cyan: "text-cyan",
    pink: "text-pink",
    orange: "text-orange",
  };

  return (
    <footer
      className={`w-full text-sm ${colors_map[color] || "text-foreground-sec"} mt-12 mb-6`}
    >
      end of the page.
    </footer>
  );
}
