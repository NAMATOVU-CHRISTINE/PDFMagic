import { useReducer, useCallback, Reducer } from 'react';

type Middleware<S, A> = (state: S, action: A, next: () => void) => void;

export function useReducerWithMiddleware<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  middleware: Middleware<S, A>
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithMiddleware = useCallback((action: A) => {
    middleware(state, action, () => dispatch(action));
  }, [state, middleware]);

  return [state, dispatchWithMiddleware] as const;
}

export default useReducerWithMiddleware;
