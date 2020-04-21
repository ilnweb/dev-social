import { observable } from 'mobx';
import { createContext } from 'react';

class Posts {
  @observable posts = [
    {
      postTitle: 'Post1',
      postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_email_campaign_qa8y_bycdui.svg',
      userName: 'John',
      createdAt: '27/12/1966'
    },
    {
      postTitle: 'Post2',
      postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_mobile_testing_reah_dmknjs.svg',
      userName: 'Tom',
      createdAt: '27/12/1966'
    },
    {
      postTitle: 'Post3',
      postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1582856305/HomePage/undraw_mobile_marketing_iqbr_bznozj.svg',
      userName: 'Sam',
      createdAt: '27/12/1966'
    },
    {
      postTitle: 'Post4',
      postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1582855597/HomePage/undraw_everywhere_together_bdmn_nimm62.svg',
      userName: 'JOJO',
      createdAt: '27/12/1966'
    },
    {
      postTitle: 'Post5',
      postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1582856305/HomePage/undraw_mobile_marketing_iqbr_bznozj.svg',
      userName: 'Rajesh',
      createdAt: '27/12/1966'
    }
  ]
  
}

export const PostContext = createContext(new Posts());