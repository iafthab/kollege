import axios from "axios";

export default axios.create({
  baseURL:
    "https://kollege-api.onrender.com",
    // "http://localhost:3500",
    //? this is the nodejs port, which is 3500 by default, and not the react port(3000).

  headers: { "Content-Type": "application/json" },
});
