import React from 'react';

interface ToggleSwitchProps {
  active: boolean;
  onClick: () => void;
  enabled?: boolean;
  scale?: number; // Size scale
  color?: string; // Track color
  thumbColor?: string; // Thumb color
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  active,
  onClick,
  enabled = true,
  scale = 1.0,
  color = '#419e32',
  thumbColor = 'black',
}) => {
  const trackStyles = {
    width: `${2 * scale}em`,
    height: `${scale}em`,
    borderRadius: `${scale}em`,
    display: 'flex',
    alignItems: 'center',
    cursor: enabled ? 'pointer' : 'default',
    transition: 'background-color 0.2s',
    backgroundColor: color,
  };

  const thumbStyles = {
    width: `${0.75 * scale}em`,
    height: `${0.75 * scale}em`,
    borderRadius: '50%',
    backgroundColor: thumbColor,
    transition: 'transform 0.2s',
    transform: active ? `translateX(${scale}em)` : 'translateX(0)',
    margin: `${0.125 * scale}em`,
  };

  return (
    <div
      style={trackStyles}
      onClick={() => {
        if (enabled) {
          onClick();
        }
      }}
    >
      <div style={thumbStyles}></div>
    </div>
  );
};

export default ToggleSwitch;
