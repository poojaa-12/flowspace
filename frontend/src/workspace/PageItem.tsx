import type { Page } from "../types/page";

interface PageItemProps {
  page: Page;
  active: boolean;
  onSelect: (id: string) => void;
}

const PageItem = ({ page, active, onSelect }: PageItemProps) => (
  <button onClick={() => onSelect(page.id)} aria-current={active ? "page" : undefined}>
    {page.emoji} {page.title}
  </button>
);

export default PageItem;

