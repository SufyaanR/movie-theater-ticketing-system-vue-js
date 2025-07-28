export async function getAllMovies() {
  const res = await fetch('http://localhost:8080/Movie/getAll');
  const data = await res.json();
  return data;
}

export async function getUserDetails(userId) {
  const res = await fetch(`http://localhost:8080/admin/read/${userId}`);
  const data = await res.json();
  return data;
}