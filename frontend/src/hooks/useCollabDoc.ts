import { useMemo } from "react";
import * as Y from "yjs";

export const useCollabDoc = (pageId: string) => {
  return useMemo(() => new Y.Doc({ guid: pageId }), [pageId]);
};

