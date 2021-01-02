import React from "react";
import useForm from "../../../hooks/useForm";

interface ISearchInputProps {
  setSubmittedUser: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({ setSubmittedUser }: ISearchInputProps) {
  const {
    inputs: { inputUser },
    onChange,
    onSubmit,
  } = useForm(() => submit(), {
    inputUser: "",
  });

  function submit() {
    setSubmittedUser(inputUser);
  }

  return (
    <>
      <input name="inputUser" />
    </>
  );
}
