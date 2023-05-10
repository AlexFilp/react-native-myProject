import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../FireBase/config';
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  startLoading,
  endLoading,
} from './authSlice';

export const doRegister =
  ({ email, password, login }) =>
  async (dispatch, state) => {
    dispatch(startLoading());
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const updatedUser = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          email: updatedUser.email,
          login: updatedUser.displayName,
        })
      );
      dispatch(endLoading());
    } catch (error) {
      dispatch(endLoading());
      console.log('error.message', error.message);
      throw error;
    }
  };

export const doLogin =
  ({ email, password }) =>
  async (dispatch, state) => {
    dispatch(startLoading());
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(endLoading());
      console.log(credentials);
      return credentials.user;
    } catch (error) {
      dispatch(endLoading());
      console.log('error.message ==>', error.message);
      throw error;
    }
  };

export const doAuthStateChange = () => async (dispatch, state) => {
  dispatch(startLoading());
  try {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            email: user.email,
            login: user.displayName,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
      dispatch(endLoading());
    });
  } catch (error) {
    dispatch(endLoading());
    console.log('error.message', error.message);
    throw error;
  }
};

export const doLogOut = () => async (dispatch, state) => {
  dispatch(startLoading());
  await auth.signOut();
  dispatch(authSignOut());
  dispatch(endLoading());
};

// export const doUpdateUserProfile = async update => {
//   const user = auth.currentUser;

//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
