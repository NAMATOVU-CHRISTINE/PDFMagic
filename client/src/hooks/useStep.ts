import { useState, useCallback } from 'react';

export function useStep(maxStep: number, initialStep = 0) {
  const [step, setStep] = useState(initialStep);

  const next = useCallback(() => setStep(s => Math.min(s + 1, maxStep)), [maxStep]);
  const prev = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);
  const reset = useCallback(() => setStep(initialStep), [initialStep]);
  const goTo = useCallback((s: number) => setStep(Math.min(Math.max(s, 0), maxStep)), [maxStep]);

  return { step, next, prev, reset, goTo, isFirst: step === 0, isLast: step === maxStep };
}

export default useStep;
