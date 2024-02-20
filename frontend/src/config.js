export const BASE_URL = "http://localhost:500/api/v1"

export const token = localStorage.getItem("token")

export const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
