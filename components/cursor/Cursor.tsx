import getPixels from "@/lib/personal/getPixels";
import getTranslationStyle from "@/lib/personal/getTranslationStyle";
import CursorSVG from "@/public/assets/CursorSVG";

interface Props {
  color: string;
  position?: { x: number; y: number };
  message?: string;
}

function Cursor({ color, position, message }: Props) {
  const translationSyle = getTranslationStyle(getPixels(position));

  return (
    <div
      className="pointer-events-none absolute"
      style={{ ...translationSyle, zIndex: 9 }}
    >
      <CursorSVG color={color} />

      {message && (
        <div
          className="left-2 top-5 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color }}
        >
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cursor;
