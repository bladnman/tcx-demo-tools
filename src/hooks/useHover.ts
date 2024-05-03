import { useCallback, useState } from "react";

/**
 * useHover
 * const { hovered, ...hoverHandlers } = useHover();
 * <Box {...hoverHandlers} />
 *
 */
export default function useHover() {
  const [hovered, setHovered] = useState<boolean>(false);
  const onMouseOver = useCallback(() => setHovered(true), []);
  const onMouseOut = useCallback(() => setHovered(false), []);

  return {
    hovered,
    onMouseOver,
    onMouseOut,
  };
}
