import * as React from "rehackt";

function getRenderDispatcher() {
  const reactInternals =
    (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ||
    (React as any)
      .__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return reactInternals?.ReactCurrentDispatcher?.current;
}

let RenderDispatcher: unknown = null;

/*
Relay does this too, so we hope this is safe.
https://github.com/facebook/relay/blob/8651fbca19adbfbb79af7a3bc40834d105fd7747/packages/react-relay/relay-hooks/loadQuery.js#L90-L98
*/
export function useRenderGuard() {
  RenderDispatcher = getRenderDispatcher();

  return React.useCallback(() => {
    return (
      RenderDispatcher != null && RenderDispatcher === getRenderDispatcher()
    );
  }, []);
}
