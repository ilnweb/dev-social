import { observable } from 'mobx';
import { createContext } from 'react';

class User {
  @observable user = {}
  
}

export const UserContext = createContext(new User());