import { useOnboardingTracker } from "./useOnboardingTracker";

const OnboardingFlow = () => {
  const { completionRate } = useOnboardingTracker();
  return (
    <section aria-label="Onboarding progress">
      <p>Onboarding completion: {completionRate}%</p>
      <progress value={completionRate} max={100} />
    </section>
  );
};

export default OnboardingFlow;

