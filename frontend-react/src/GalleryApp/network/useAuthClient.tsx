import { useAppDispatch } from '../../store/hooks'
import { getUser_testfunc } from '../network/useClient'
import { setAuthResolved } from '../../store/slices/authSlice'
import { useAppSelector } from './../../store/hooks';
import { selectUser } from './../../store/slices/authSlice';

const useAuthClient = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  // Temporary quick test
  const isLoggedIn = (): boolean => {
    if (!user) return false
    if (!user.token) return false
    return true
  }
  
  const login = async (username: string, password: string) => {
    // NOTE: This is not the real login
    // TODO: Real login
    const user = getUser_testfunc('Test account')
    dispatch(setAuthResolved(user))
    console.log("Logged in. User -> ", user);
    return user
  }

  const getUser = () => user

  return {
    isLoggedIn,
    getUser,
    login
  }
}

export default useAuthClient