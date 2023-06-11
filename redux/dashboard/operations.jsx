import { getPosts, addCommentToPost } from './dashboardSlice';
import { db } from '../../FireBase/config';
import { getDocs, collection, updateDoc } from 'firebase/firestore';

export const getAllPosts = () => async (dispatch, state) => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));

    const allPosts = [];

    snapshot.forEach(doc => {
      allPosts.push({ id: doc.id, data: doc.data() });
    });

    dispatch(getPosts(allPosts));
  } catch (error) {
    console.log('error.message', error.message);
    throw error;
  }
};
