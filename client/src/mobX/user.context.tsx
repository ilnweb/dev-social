import { types, Instance } from "mobx-state-tree";

export const currentUserModel = types.model({
  photoURL: types.string,
  id: types.identifier,
  displayName: types.string,
  email:types.string,
  location: types.optional(types.maybeNull(types.string), null),
  jobTitle:  types.optional(types.maybeNull(types.string), null),
  workStatus: types.optional(types.maybeNull(types.string), null),
  skills:  types.optional(types.maybeNull(types.string), null),
})

export type currentUserInstance = Instance<typeof currentUserModel>
