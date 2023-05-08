import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../FireBase/config';

export const doRegister =
  ({ email, password, login }) =>
  async (dispatch, state) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(newUser);
    } catch (error) {
      console.log('error.message', error.message);
      throw error;
    }
  };

export const doAuthStateChange = async (onChange = () => {}) => {
  onAuthStateChanged(user => {
    onChange(user);
  });
};

export const doLogin = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const doUpdateUserProfile = async update => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
