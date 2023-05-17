import axios from "axios";

export default axios.create({
  baseURL: "https://kollege-api.onrender.com/",
  headers: { "Content-Type": "application/json" },
});
