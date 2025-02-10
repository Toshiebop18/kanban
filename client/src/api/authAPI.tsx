import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await response.json();
    console.log(data)
    return data.token; // Return the token on success
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}



export { login };
