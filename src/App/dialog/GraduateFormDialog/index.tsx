import { Dialog, DialogProps, Snackbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md ~ 900px

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
      const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
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
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isMobile ? '100%' : '600px',
          borderRadius: 2,
        },
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-white p-6 sm:min-w-[380px] rounded-xl shadow-lg"
      >
        <div>
          <label htmlFor="profilePicture" className="block mb-1 text-sm font-medium text-gray-700">
            Завантажити фото профілю:
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Попередній перегляд фото:</p>
              <img
                src={selectedFile}
                alt="Preview"
                className="mt-2 h-24 w-24 rounded border border-gray-300 object-cover"
              />
            </div>
          )}
        </div>

        <FormField label="Ім'я" name="firstName" register={register} error={errors.firstName} />
        <FormField label="Прізвище" name="lastName" register={register} error={errors.lastName} />
        <FormField label="По батькові" name="patronymic" register={register} error={errors.patronymic} />
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
          className="self-start rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Додати освіту
        </button>

        <FormField label="Поточна робота" name="job" register={register} error={errors.job} />
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
          className="mt-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Надіслати
        </button>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
