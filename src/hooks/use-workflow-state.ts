import { useState, useEffect } from 'react';

interface WorkflowState {
  [key: string]: any;
}

export function useWorkflowState<T extends WorkflowState>(key: string, initialState: T) {
  const [state, setState] = useState<T>(() => {
    const saved = sessionStorage.getItem(`quentlex_workflow_${key}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(`quentlex_workflow_${key}`, JSON.stringify(state));
  }, [key, state]);

  const clearState = () => {
    sessionStorage.removeItem(`quentlex_workflow_${key}`);
    setState(initialState);
  };

  return [state, setState, clearState] as const;
}