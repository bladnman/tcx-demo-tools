import React from 'react';
import ToggleSwitch from './ToggleSwitch';

interface StatusIndicatorProps {
  status: boolean;
  type: 'host' | 'client';
  onClick?: () => void;
  enabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  type,
  onClick,
  enabled = true,
  size = 'small',
}) => {
  const sizeMap = {
    small: 12,
    medium: 17,
    large: 22,
  };
  const isHost = type === 'host';
  const label = isHost ? 'Registered' : 'Connected';
  const green = '#2d962d';
  const red = '#882020';
  const white = '#eaeaea';
  const gray = '#7a7a7a';
  const disabled = '#464646';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <ToggleSwitch
        active={status}
        scale={0.75}
        enabled={enabled}
        color={enabled ? (status ? green : red) : disabled}
        onClick={() => onClick?.()}
      />
      <span
        style={{
          fontSize: sizeMap[size],
          display: 'inline-block',
          color: enabled ? (status ? white : gray) : disabled,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default StatusIndicator;
