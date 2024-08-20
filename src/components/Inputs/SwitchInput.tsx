import { Switch } from '../ui/switch';

interface SwitchInputProps {
  zSchemaName: string;
  inputLabel: string;
  inputValue: boolean;
  handleChange: (checked: boolean, name: string) => void;
}

export default function SwitchInput({
  zSchemaName,
  inputLabel,
  inputValue,
  handleChange,
}: SwitchInputProps) {
  return (
    <div className="flex justify-between">
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor={zSchemaName}
      >
        {inputLabel}
      </label>
      <Switch
        // defaultChecked={inputValue as boolean}
        checked={inputValue as boolean}
        onCheckedChange={(checked) => handleChange(checked, zSchemaName)}
      />
    </div>
  );
}
