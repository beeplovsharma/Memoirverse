import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const userStore = (set) => ({
  users: [
    {
      id:Date.now(),
      name: "John",
      age: 1,
      email: "",
      profile: "",
    },
  ],
  oldUser:{
    id:"",
    name:"",
    age:"",
    email:"",
    profile:""
  },
  addUser: (user) => {
    set((state) => ({
      users: [user, ...state.users],
    }));
  },
  addOldUser: (user) => {
    set((state) => ({
      oldUser: {user},
    }));
  },
  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter((user, id) => id !== userId),
    }));
  },
  updateUser: (userId, newUser) => {
    set((state) => ({
      users: state.users.map((user, id) =>
        user.id === userId ? { ...user, ...newUser } : user
      ),
    }));
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "users",
    })
  )
);
export default useUserStore;
