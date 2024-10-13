export const fetchUserDataFromGoogle = async(token) => {
    try {
      const userData = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const userInfo = await userData.json();
      return userInfo;
    } catch (error) {
      console.log(error);
    }
}

