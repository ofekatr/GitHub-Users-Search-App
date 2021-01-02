import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../../../hooks/useForm";
import "./SearchInput.scss";

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
    <form action="#" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        name="inputUser"
        placeholder="Search User..."
        value={inputUser}
        autoComplete="off"
      />
      <button type="submit">
        <span>
          <FontAwesomeIcon icon="search" />
        </span>
        <p>Search</p>
      </button>
    </form>
  );
}
