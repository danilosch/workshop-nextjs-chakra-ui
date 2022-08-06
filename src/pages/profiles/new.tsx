import React, { ReactElement, useRef } from "react";
import { Container } from "@chakra-ui/react";
import { NextPageWithLayout } from "../_app";
import PrivatePage from "@/layouts/PrivatePage";
import { UserProfileData } from "@/typings/user-profile";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import api, { httpErrorHandler } from "@/services/api";
import { useRouter } from "next/router";
import UserProfileForm from "@/components/forms/UserProfileForm";
import {
  FormValues,
  UserProfileFormRefType,
} from "@/components/forms/UserProfileForm/UserProfileForm";

type Props = {
  data: UserProfileData;
};

type AxiosResponseData = {
  newProfile: UserProfileData;
};

const ProfileId: NextPageWithLayout<Props> = ({ data }) => {
  const router = useRouter();
  const formRef = useRef<UserProfileFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const { data } = await api.post<AxiosResponseData>("profiles", values);
      toast.success("Profile created succesfully!");
      router.push(`/profiles/${data.newProfile.id}`);
    } catch (error) {
      httpErrorHandler(error, formRef.current?.setError);
    }
  };

  return (
    <Container maxW="1400px" m="auto" py={10}>
      <UserProfileForm ref={formRef} onSubmit={onSubmit} defaultValues={data} />
    </Container>
  );
};

ProfileId.getLayout = (page: ReactElement) => {
  return <PrivatePage>{page}</PrivatePage>;
};

export default ProfileId;
