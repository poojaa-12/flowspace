import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import SlashCommandPlugin from "./SlashCommandPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import DragDropPlugin from "./DragDropPlugin";
import CollabPlugin from "./CollabPlugin";
import { useAuth } from "../hooks/useAuth";
import { useOnboardingTracker, OnboardingStep } from "../onboarding/useOnboardingTracker";

interface FlowEditorProps {
  pageId: string;
}

const FlowEditor = ({ pageId }: FlowEditorProps) => {
  const { user } = useAuth();
  const { trackStep } = useOnboardingTracker();

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "FlowSpaceEditor",
        onError: (error: Error) => console.error(error),
        nodes: []
      }}
    >
      <div onKeyDown={() => void trackStep(OnboardingStep.FIRST_EDIT)}>
        <ToolbarPlugin />
        {user ? (
          <CollabPlugin pageId={pageId} currentUser={{ id: user.id, name: user.displayName || user.email }} />
        ) : null}
        <RichTextPlugin
          contentEditable={<ContentEditable aria-label="FlowSpace editor" />}
          placeholder={<div />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <SlashCommandPlugin />
        <DragDropPlugin />
      </div>
    </LexicalComposer>
  );
};

export default FlowEditor;

