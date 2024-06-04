import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../store/userStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Form() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required !'),
    email: yup.string().email().required('Enter a valid email address !'),
    age: yup.number().required('Age must be greater than 1 !').min(1),
    profile: yup.string().required('Enter image url !'),

    // password:yup.string().min(4).max(20).required(),
    // confirmPassword: yup.string().oneOf([yup.ref('password'),null]).required()
  });

  const { addUser, oldUser, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: null,
      profile: "",
    },
  });

  const [isUpdate, setIsUpdate] = useState(false)

  // This function is written so that it doesn't run on first render
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setIsUpdate(true);
    setValue("name", oldUser.user.name);
    setValue("email", oldUser.user.email);
    setValue("age", oldUser.user.age);
    setValue("profile", oldUser.user.profile);
  }, [oldUser]);

  const onSubmit = (data) => {
    console.log(data);
    addUser({
      id: Date.now(),
      name: data.name,
      email: data.email,
      age: data.age,
      profile: data.profile,
    });
    toast.success("User Added Successfully");
    reset();
  };

  const onUpdate = (data) => {
    console.log(data);
    updateUser(oldUser.user.id, {
      name: data.name,
      email: data.email,
      age: data.age,
      profile: data.profile,
    });
    toast.success("User Updated Successfully");
    reset();
    setIsUpdate(false);
  }
  return (
    <>
      <form
        action=""
        className="flex flex-col md:flex-row gap-2"
        onSubmit={isUpdate ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="text"
            className="w-full px-2 py-1 rounded-lg outline-[salmon]"
            placeholder="Name"
            {...register("name")}
          />
          <p className="text-red-400 text-[10px]">{errors.name?.message}</p>
        </div>
        <div>
          <input
            type="email"
            className="w-full px-2 py-1 rounded-lg outline-[salmon]"
            placeholder="Email"
            {...register("email")}
          />
          <p className="text-red-400 text-[10px]">{errors.email?.message}</p>
        </div>
        <div>
          <input
            type="number"
            className="w-full px-2 py-1 rounded-lg outline-[salmon]"
            placeholder="Age"
            {...register("age")}
          />
          <p className="text-red-400 text-[10px]">{errors.age?.message}</p>
        </div>
        <div>
          <input
            type="text"
            className="w-full px-2 py-1 rounded-lg outline-[salmon]"
            placeholder="Profile URL"
            {...register("profile")}
          />
          <p className="text-red-400 text-[10px]">{errors.profile?.message}</p>
        </div>
        <div className="flex gap-2 h-fit">
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="submit"
            className={`${
              isUpdate ? "bg-blue-400" : "bg-red-400"
            } px-4 py-2 rounded-lg text-white cursor-pointer`}
          >
            {isUpdate ? `Update` : `Submit`}
          </motion.button>

          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => {
              reset();
              setIsUpdate(false);
            }}
            className="bg-orange-400 px-4 py-2 rounded-lg text-white cursor-pointer"
          >
            Reset
          </motion.button>
        </div>
      </form>
    </>
  );
}

export default Form;
