export const isSessionValid = () => {
  const token = localStorage.getItem("token");
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  return (
    token &&
    loginTimestamp &&
    Date.now() - parseInt(loginTimestamp, 10) < 2 * 24 * 60 * 60 * 1000
  );
};