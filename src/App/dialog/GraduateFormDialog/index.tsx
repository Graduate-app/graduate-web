import { Dialog, DialogProps, Snackbar } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import FormField from '../../../components/FormFields';
import DegreeForm from '../../../components/DegreeForm';
import { sendGraduateForm, uploadProfilePicture } from '../../../api';
import { saveData } from '../../../db';
import { defaultDegree, departmentHelpingOptions } from '../../../consts';
import { FormInputs } from '../../../types';
import { useState } from 'react';

export interface IDialogProps extends Pick<DialogProps, 'open'> {
  onClose: () => void;
}

const GraduateFormDialog: React.FC<IDialogProps> = ({ open, onClose }) => {
  const [isPopOpen, setPopOpen] = useState(false);
  const [popText, setPoptext] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty, isLoading },
  } = useForm<FormInputs>({
    defaultValues: {
      degree: [defaultDegree],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'degree',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      let profilePictureId;

      // Check if a file was uploaded
      const fileInput = document.getElementById(
        'profilePicture'
      ) as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const res = await uploadProfilePicture(file);
        profilePictureId = res.id;
      }

      const res = await sendGraduateForm({ ...data, profilePictureId });
      setPoptext('Успішно надіслано');
      setPopOpen(true);
      saveData(res);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (e) {
      setPoptext('Трапилась помилка');
      setPopOpen(true);
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-[16px] px-[30px]"
      >
        <label htmlFor="profilePicture" className="block">
          Завантажити фото профілю:
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          className="border p-2"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <div className="mt-2">
            <p>Попередній перегляд фото:</p>
            <img
              src={selectedFile}
              alt="Preview"
              className="mt-2 border border-gray-300 rounded"
              style={{ height: '100px', objectFit: 'cover' }} // Adjust size as needed
            />
          </div>
        )}

        <FormField
          label="Ім'я"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <FormField
          label="Прізвище"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <FormField
          label="По батькові"
          name="patronymic"
          register={register}
          error={errors.patronymic}
        />
        <FormField
          label="Електронна пошта"
          name="email"
          register={register}
          error={errors.email}
          type="email"
        />
        <FormField
          label="Номер телефону"
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          type="tel"
        />

        {fields.map((field, index) => (
          <DegreeForm
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={() => append(defaultDegree)}
          className="bg-green-500 text-white p-2 rounded"
        >
          Додати освіту
        </button>

        <FormField
          label="Поточна робота"
          name="job"
          register={register}
          error={errors.job}
        />
        <FormField
          label="Чим можете допомогти кафедрі"
          name="departamentHelping"
          register={register}
          error={errors.departamentHelping}
          options={departmentHelpingOptions}
        />

        <button
          type="submit"
          disabled={!isValid || !isDirty || isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Надіслати
        </button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isPopOpen}
          autoHideDuration={4000}
          onClose={() => setPopOpen(false)}
          message={popText}
        />
      </form>
    </Dialog>
  );
};

export default GraduateFormDialog;
