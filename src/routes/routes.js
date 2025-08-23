//MOVIES
export async function getAllMovies() {
  const res = await fetch('http://localhost:8080/Movie/getAll');
  const data = await res.json();
  return data;
}

export async function getMovieById(id) {
  const res = await fetch(`http://localhost:8080/Movie/read/${id}`);
  const data = await res.json();
  return data;
}

export async function createMovie(movie) {
    const res = await fetch("http://localhost:8080/Movie/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

export async function updateMovie(movie) {
    const res = await fetch("http://localhost:8080/Movie/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie)
    });
    return await res.json();
}

//BRANCHES
export async function getAllBranches() {
    const res = await fetch('http://localhost:8080/branch/getAll');
    const data = await res.json();
    return data;
}

//THEATERS
export async function getAllTheatersByBranchId(id) {
    const res = await fetch(`http://localhost:8080/theaterRoom/getAll/${id}`);
    const data = await res.json();
    return data;
}

export async function getUserDetails(userId) {
  const res = await fetch(`http://localhost:8080/admin/read/${userId}`);
  const data = await res.json();
  return data;
}

//SEATS
export async function getAllSeatsByTheaterRoomId(id) {
    const res = await fetch(`http://localhost:8080/seat/getAll/${id}`);
    const data = await res.json();
    return data;
}