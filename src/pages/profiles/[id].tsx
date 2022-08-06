import { GetServerSideProps } from "next";
import PrivatePage from "@/layouts/PrivatePage";
import { Container } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";
import { NextPageWithLayout } from "../_app";
import api, { getAPIClient, httpErrorHandler } from "@/services/api";
import { UserProfileData } from "@/typings/user-profile";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { removeEmptyValues } from "@/utils/parse";
import UserProfileForm, {
  FormValues,
  UserProfileFormRefType,
} from "@/components/forms/UserProfileForm/UserProfileForm";

type Props = {
  data: UserProfileData;
};

const ProfileId: NextPageWithLayout<Props> = ({ data }) => {
  const formRef = useRef<UserProfileFormRefType>(null);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    removeEmptyValues(values);
    try {
      await api.put(`/profiles/${values.id}`, values);
    } catch (error) {
      httpErrorHandler(error, formRef.current?.setError);
    }
    toast.success("Data edited successfully!");
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <Container maxW="1400px" m="auto" py={10}>
      <UserProfileForm ref={formRef} onSubmit={onSubmit} defaultValues={data} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const api = getAPIClient(ctx);
  const { data } = await api.get(`profiles/${id}`);

  return {
    props: {
      data,
    },
  };
};

ProfileId.getLayout = (page: ReactElement) => {
  return <PrivatePage>{page}</PrivatePage>;
};

export default ProfileId;
