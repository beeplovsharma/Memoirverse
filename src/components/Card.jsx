import React from "react";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
function Card() {
  const { users, addOldUser, removeUser } = useUserStore();
  const handleUpdate = (userToBeUpdated) => {
    addOldUser(userToBeUpdated);
    console.log(userToBeUpdated);
  };
  
  return (
    <>
      {users.map((user, index) => (
        <motion.div
          drag
          dragConstraints={{
            left: -1,
            right: 1,
            top: 1,
            bottom: -1,
          }}
          
          whileTap={{
            scale:1.04
          }}
          key={index}
          className="bg-[#eff1f0] w-[250px] p-2 m-2 rounded-xl flex flex-col gap-2 justify-center items-center shadow-md"
        >
          <img
            src={user.profile}
            alt=""
            className="w-24 h-24 object-cover rounded-full pointer-events-none"
          />
          <div className="flex flex-col text-black items-center">
            <h1 className='text-xl font-bold font-["tomato_grotesk"]'>
              {user.name}
            </h1>
            <h2 className="opacity-60">{user.age}yr</h2>
            <h1 className="opacity-60">{user.email}</h1>
            <div className="flex gap-2">
              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => {
                  removeUser(index);
                  toast.error("User Removed");
                }}
                className="bg-red-400 text-white px-4 py-2 rounded-xl mt-2"
              >
                Remove
              </motion.button>
              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() => {
                  handleUpdate(user);
                  toast.success("User Ready For Editing !");
                  window.scrollTo({top:0,left:0,behavior: 'smooth'})
                }}
                className="bg-blue-400 text-white px-4 rounded-xl mt-2"
              >
                Edit
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default Card;
