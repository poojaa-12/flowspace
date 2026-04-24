import PageItem from "./PageItem";
import { usePages } from "../hooks/usePages";

const PageList = () => {
  const { pages, activePageId, setActivePageId } = usePages();
  return (
    <nav aria-label="Page list">
      {pages.map((page) => (
        <PageItem key={page.id} page={page} active={page.id === activePageId} onSelect={setActivePageId} />
      ))}
    </nav>
  );
};

export default PageList;

