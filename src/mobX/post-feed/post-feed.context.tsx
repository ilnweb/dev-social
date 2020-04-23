import { observable } from 'mobx';
import { createContext } from 'react';

class Posts {
  @observable posts = []
  
}

export const PostContext = createContext(new Posts());