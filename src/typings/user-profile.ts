import { ApiPagination } from "./api";

export type UserProfileData = {
  createdAt: string;
  id: string;
  name: string;
};

export type UserProfileResponse = {
  data: UserProfileData[];
  pagination: ApiPagination;
};
