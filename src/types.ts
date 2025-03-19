export type Degree = {
  degree: string;
  major: string;
  enrollmentYear: number;
  graduationYear: number;
};

export type ProfilePicture = {
  id: number;
  src: string;
}

export type FormInputs = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phoneNumber: string;
  degree: Degree[];
  job: string;
  departamentHelping: string;
  profilePictureId?: number;
};

export type Graduand = {
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phoneNumber: string;
  degree: Degree[];
  job: string;
  departamentHelping: string;
  profilePicture?: ProfilePicture;
}