export default async function getUserInfo(userName) {
    const res = await fetch("http://localhost:3000/api/users/" + userName);
    const data = await res.json();
    delete data.password;
  
    return data;
  }
  