export const degreeOptions = [
  { value: 'bachelor', label: 'Бакалавр' },
  { value: 'master', label: 'Магістр' },
  { value: 'aspirant', label: 'Аспірант' }
];

export const majorOptions = [
  { value: 'computerEngineering', label: 'Комп\'ютерна інженерія' },
  { value: 'electronics', label: 'Електроніка' }
];

export const departmentHelpingOptions = [
  { value: 'lessons', label: 'Провести лекцію/вебінар' },
  { value: 'financial', label: 'Фінансова допомога' },
  { value: 'accreditation', label: 'Допомогти з атестацією' },
  { value: 'nothing', label: 'Нічим' },
];

export const defaultDegree = {
  degree: '',
  major: '',
  qualificationWork: '',
  enrollmentYear: new Date().getFullYear(),
  graduationYear: new Date().getFullYear(),
};