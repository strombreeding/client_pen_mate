import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useBlocker(
  blocker: (tx: { retry: () => void }) => void,
  when = true
): void {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const unblock = navigate(location.pathname, { replace: true });

    const unblockFunction = () => {
      const tx = { retry: () => unblock };
      blocker(tx);
    };

    return unblockFunction;
  }, [blocker, location.pathname, navigate, when]);
}

export default useBlocker;

export function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx: any) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
