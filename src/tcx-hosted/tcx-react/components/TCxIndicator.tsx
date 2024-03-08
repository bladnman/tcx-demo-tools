import React from 'react';
import StatusIndicator from './StatusIndicator';
import TCx from 'tcx';

interface TCxIndicatorProps {
  tcx: TCx;
  size?: 'small' | 'medium' | 'large';
  title?: string;
}
export default function TCxIndicator({
  tcx,
  size = 'small',
  title,
}: TCxIndicatorProps) {
  const onRegisterClicked = () => {
    if (tcx.isRegistered) {
      tcx.unregister();
    } else {
      tcx.register();
    }
  };
  const onConnectionClicked = () => {
    if (tcx.isConnected) {
      tcx.disconnect();
    } else {
      if (tcx.connectToName) {
        tcx.connectTo(tcx.connectToName);
      }
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        cursor: 'default',
      }}
    >
      <div title={tcx.name}>
        <StatusIndicator
          status={tcx.isRegistered}
          type={'host'}
          size={size}
          onClick={onRegisterClicked}
        />
      </div>
      <div title={tcx.connectedToName}>
        <StatusIndicator
          status={tcx.isConnected}
          type={'client'}
          size={size}
          enabled={tcx.isRegistered}
          onClick={onConnectionClicked}
        />
      </div>
      {title && <div style={{ opacity: 0.5, fontSize: '0.6em' }}>{title}</div>}
    </div>
  );
}
