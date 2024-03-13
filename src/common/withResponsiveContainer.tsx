import { ComponentType, ReactElement } from 'react';
import useContainerDimensions from '@hooks/useContainerDimensions';

// Define props that the HOC will inject into the wrapped component
export interface InjectedDimensionProps {
  width: number;
  height: number;
}

// This function takes a component...
export function withResponsiveContainer<T extends InjectedDimensionProps>(
  WrappedComponent: ComponentType<T>,
) {
  // ...and returns another component...
  return function ResponsiveComponent(
    props: Omit<T, keyof InjectedDimensionProps>,
  ): ReactElement {
    const { ref, width, height } = useContainerDimensions();

    // Render the wrapped component with the new props
    return (
      <div ref={ref} style={{ width: '100%', height: '100%' }}>
        <WrappedComponent {...(props as T)} width={width} height={height} />
      </div>
    );
  };
}
