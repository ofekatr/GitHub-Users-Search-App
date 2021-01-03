import { useState } from "react";

/**
 * @description Handles side effects logic regarding filling and submitting forms.
 */
export default function useForm(callback: () => void, initState: any = {}) {
  const [inputs, setInputs] = useState(initState);

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return {
    onChange,
    onSubmit,
    inputs,
  };
}
