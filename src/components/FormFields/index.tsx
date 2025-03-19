import { Path, UseFormRegister, FieldError } from 'react-hook-form';
import { FormInputs } from '../../types';

interface FormFieldProps {
  label: string;
  name: Path<FormInputs>;
  register: UseFormRegister<FormInputs>;
  error?: FieldError;
  type?: string;
  options?: { value: string; label: string }[];
}

const FormField = ({ label, name, register, error, type = 'text', options }: FormFieldProps) => {
  const inputProps = register(name, { required: true, ...(type === 'number' && { valueAsNumber: true }) });
  
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-gray-700">
        {label}
      </label>
      {options ? (
        <select id={name} {...inputProps} className="border p-2" defaultValue="">
          <option value="" disabled>Оберіть варіант</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...inputProps}
          className="border p-2"
        />
      )}
      {error && <span className="text-red-500">Це поле є обов'язковим</span>}
    </div>
  );
};

export default FormField;