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

export async function getMoviesByGenre(genre){
    const res = await fetch(`http://localhost:8080/Movie/genre/${genre}`);
    const data = await res.json();
    return data;
}

export async function findByTitle(title){
    const res = await fetch(`http://localhost:8080/Movie/title/${title}`);
    const data = await res.json();
    return data;
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

//SEATS
export async function getAllSeatsByTheaterRoomId(id) {
    const res = await fetch(`http://localhost:8080/seat/getAll/${id}`);
    const data = await res.json();
    return data;
}

//ADMINS
export async function getAdminDetails(userId) {
    const res = await fetch(`http://localhost:8080/admin/read/${userId}`);
    const data = await res.json();
    return data;
}

export async function createAdmin(admin) {
    const res = await fetch(`http://localhost:8080/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    });
    return await res.json();
}

export async function updateAdmin(admin) {
    const res = await fetch(`http://localhost:8080/admin/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    });
    return await res.json();
}
//Card
export async function addCard(card) {
    const res = await fetch("http://localhost:8080/Card/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card)
    });
    return await res.json();
}

//Payment
export async function createPayment(payment){
    const res = await fetch("http://localhost:8080/payment/create", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payment)
    });
    return await res.json();
}

//SCHEDULE
export async function createSchedule(schedule) {
    const res = await fetch("http://localhost:8080/Schedule/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    });
    return await res.json();
}

// CUSTOMER
export async function getCustomerDetails(userId) {
    const res = await fetch(`http://localhost:8080/customer/read/${userId}`);
    const data = await res.json();
    return data;
}

export async function createCustomer(customer) {
    const res = await fetch(`http://localhost:8080/customer/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    return await res.json();
}
export async function updateCustomer(customer) {
    const res = await fetch(`http://localhost:8080/customer/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
    return await res.json();
}
