import InputText from "@/components/inputs/InputText";
import { UserProfileData } from "@/typings/user-profile";
import { Box, Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import {
  SubmitHandler,
  useForm,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import schema from "./schema";

export type FormValues = UserProfileData;

type Props = {
  onSubmit: SubmitHandler<FormValues>;
  defaultValues: Partial<FormValues>;
};

export type UserProfileFormRefType = {
  setError: UseFormSetError<FormValues>;
  setValue: UseFormSetValue<FormValues>;
};

const UserProfileForm: ForwardRefRenderFunction<
  UserProfileFormRefType,
  Props
> = ({ onSubmit, defaultValues }, ref) => {
  const { handleSubmit, control, setError, setValue } = useForm({
    defaultValues: {
      id: "",
      createdAt: "",
      name: "",
      ...defaultValues,
    },
    resolver: yupResolver(schema()),
  });

  useImperativeHandle(ref, () => ({
    setError,
    setValue,
  }));

  return (
    <Box
      as="form"
      maxWidth="600px"
      m="auto"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputText label="Name" name="name" control={control} />
      <Button mt={8} type="submit" colorScheme="brand">
        Submit
      </Button>
    </Box>
  );
};

export default forwardRef(UserProfileForm);
