import React, { ChangeEventHandler } from 'react';

interface InputDateProps {
  id: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  width: string,
  icon: JSX.Element,
  placeholder?: string
}

const InputDate: React.FC<InputDateProps> = ({
  id,
  value,
  onChange,
  width,
  icon
}) => {
  return (
    <div>
      <div className={`${width}`}>
        <div className="flex items-center rounded-md h-9 bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          
          <span className="flex items-center justify-center w-9 min-w-9 h-9 bg-gray-200 text-indigo-600 rounded-l-md">
            {icon}
          </span>

          <input
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            type="date"
            className="block min-w-0 grow py-1.5 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
}

export default InputDate;