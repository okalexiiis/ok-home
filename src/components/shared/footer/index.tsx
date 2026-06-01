interface IFooterProps {
  color: string;
}

const colorsMap: Record<string, string> = {
  blue: "text-blue",
  red: "text-red",
  green: "text-green",
  purple: "text-purple",
  yellow: "text-yellow",
  cyan: "text-cyan",
  pink: "text-pink",
  orange: "text-orange",
};

export function Footer({ color }: IFooterProps) {

  return (
    <footer
      className={`w-full text-sm ${colorsMap[color] || "text-foreground-sec"} mt-12 mb-6`}
    >
      end of the page.
    </footer>
  );
}
