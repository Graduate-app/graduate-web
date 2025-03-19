import { UseFormRegister, FieldErrors } from 'react-hook-form';
import FormField from '../FormFields';
import { Trash2 } from 'lucide-react';
import { degreeOptions, majorOptions } from '../../consts';
import { FormInputs } from '../../types';

interface DegreeFormProps {
  index: number;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  onRemove?: () => void;
  canRemove: boolean;
}

const DegreeForm = ({ index, register, errors, canRemove, onRemove }: DegreeFormProps) => {
  return (
    <div className="border p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Освіта {index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
            title="Видалити освіту"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      <FormField
        label="Ступінь"
        name={`degree.${index}.degree`}
        register={register}
        error={errors.degree?.[index]?.degree}
        options={degreeOptions}
      />
      <FormField
        label="Спеціальність"
        name={`degree.${index}.major`}
        register={register}
        error={errors.degree?.[index]?.major}
        options={majorOptions}
      />
      <FormField
        label="Рік вступу"
        name={`degree.${index}.enrollmentYear`}
        register={register}
        error={errors.degree?.[index]?.enrollmentYear}
        type="number"
      />
      <FormField
        label="Рік випуску"
        name={`degree.${index}.graduationYear`}
        register={register}
        error={errors.degree?.[index]?.graduationYear}
        type="number"
      />
    </div>
  );
};

export default DegreeForm;