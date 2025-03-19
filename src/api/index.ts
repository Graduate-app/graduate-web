import axios from "axios";
import { FormInputs, ProfilePicture } from "../types";

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASEPATH}`,
});

export const sendGraduateForm = async (data: FormInputs) => {
  const response = await client.post('/graduand/send', data);
  return response.data;
};

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await client.post<ProfilePicture>('/upload-picture', formData);
  return response.data;
};