interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ToggleSwitch = ({ isEnabled, onToggle }: ToggleSwitchProps) => {
  return (
    <div
      className={`relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors duration-300 ${
        isEnabled ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
      onClick={() => onToggle(!isEnabled)}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform duration-300 ${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;