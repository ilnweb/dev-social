import { types, Instance } from "mobx-state-tree";

export const currentUserModel = types.model({
  photoURL: types.string,
  id: types.identifier,
  displayName: types.string,
  email: types.string
  // date: types.custom<number, Date>()
})

export type currentUserInstance = Instance<typeof currentUserModel>
