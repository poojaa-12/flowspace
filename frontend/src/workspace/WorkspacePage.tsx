import Sidebar from "./Sidebar";
import FlowEditor from "../editor/FlowEditor";
import OnboardingFlow from "../onboarding/OnboardingFlow";
import { usePages } from "../hooks/usePages";
import SkipToContent from "../components/SkipToContent";

const WorkspacePage = () => {
  const { activePageId } = usePages();
  return (
    <div>
      <SkipToContent />
      <Sidebar />
      <main id="main-content">
        <OnboardingFlow />
        {activePageId ? <FlowEditor pageId={activePageId} /> : <p>Select or create a page.</p>}
      </main>
    </div>
  );
};

export default WorkspacePage;

