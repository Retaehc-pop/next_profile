export const userData = (user) => {
    const { uid, email, xa, displayName, photoUrl } = user
    return {
        id: uid,
        email,
        token: xa,
        name: displayName,
        profilePic: photoUrl
    }
}