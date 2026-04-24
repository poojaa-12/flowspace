import { useMemo } from "react";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#14b8a6"];

interface CollabUser {
  id: string;
  name: string;
  color?: string;
}

interface CollabPluginProps {
  pageId: string;
  currentUser: CollabUser;
}

const hashColor = (userId: string) => {
  const hash = Array.from(userId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
};

const CollabPlugin = ({ pageId, currentUser }: CollabPluginProps) => {
  const doc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(
    () => new WebsocketProvider(`${import.meta.env.VITE_WS_URL}/collab?room=${pageId}`, pageId, doc),
    [pageId, doc]
  );

  provider.awareness.setLocalState({
    name: currentUser.name,
    color: currentUser.color || hashColor(currentUser.id)
  });

  return (
    <CollaborationPlugin
      id={pageId}
      providerFactory={() => provider as never}
      shouldBootstrap={true}
      username={currentUser.name}
    />
  );
};

export default CollabPlugin;

