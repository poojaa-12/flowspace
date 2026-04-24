import { useEffect, useRef, useState } from "react";

const options = [
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Bullet List",
  "Numbered List",
  "To-do",
  "Code Block",
  "Divider"
];

const SlashCommandPlugin = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      if (!open) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((value) => (value + 1) % options.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((value) => (value - 1 + options.length) % options.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div ref={menuRef} role="listbox" aria-activedescendant={`slash-option-${activeIndex}`}>
      {options.map((option, index) => (
        <div key={option} id={`slash-option-${index}`} role="option" aria-selected={activeIndex === index}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default SlashCommandPlugin;

