import { useEffect } from "react";
import client from "../api/client";
import { useWorkspaceStore } from "../store/workspaceStore";

export const usePages = () => {
  const { pages, setPages, activePageId, setActivePageId } = useWorkspaceStore();

  useEffect(() => {
    const load = async () => {
      const { data } = await client.get("/pages");
      setPages(data.pages);
      if (!activePageId && data.pages.length > 0) {
        setActivePageId(data.pages[0].id);
      }
    };
    void load();
  }, [setPages, activePageId, setActivePageId]);

  return { pages, activePageId, setActivePageId };
};

