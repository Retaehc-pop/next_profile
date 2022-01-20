import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { initFirebase } from './initFirebase'
import { getAuth } from "firebase/auth";
import {
	removeUserCookie,
	setUserCookie,
	getUserFromCookie,
} from './userCookies'
import { userData } from './userData'


initFirebase()
export const useUser = () => {
	const [user, setUser] = useState()
	const router = useRouter()
	const auth = getAuth()

	const logout = async () => {
		try {
				await auth.signOut();
				removeUserCookie();
				router.push("/login");
		} catch (e) {
				console.log(e.message);
		}
	}

	useEffect(() => {
		const cancelAuthListener = auth.onIdTokenChanged((user) => {
			if (user) {
				const userDatas = userData(user)
				setUserCookie(userDatas)
				setUser(userDatas)
			} else {
				removeUserCookie()
				setUser()
			}
		})

		const userFromCookie = getUserFromCookie()
		if (!userFromCookie) {
			router.push('/login')
			return
		}
		setUser(userFromCookie)

		return () => {
			cancelAuthListener()
		}
	}, [])

	return { user, logout }
}

// export { useUser }