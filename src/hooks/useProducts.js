import { useEffect, useState } from "react";
const API = "https://dummyjson.com";

export function useProducts({ limit = 12, skip = 0, category = "", search = "" } = {}) {
  const [state, setState] = useState({ data: [], total: 0, loading: true, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    const endpoint = search ? `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}` : category ? `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}` : `/products?limit=${limit}&skip=${skip}`;
    fetch(`${API}${endpoint}`, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error("Unable to load products."); return response.json(); }).then((result) => setState({ data: result.products || [], total: result.total || 0, loading: false, error: "" })).catch((error) => { if (error.name !== "AbortError") setState({ data: [], total: 0, loading: false, error: error.message }); });
    return () => controller.abort();
  }, [category, limit, search, skip]);
  return state;
}

export function useProduct(id) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/products/${id}`, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error("Product not found."); return response.json(); }).then((data) => setState({ data, loading: false, error: "" })).catch((error) => { if (error.name !== "AbortError") setState({ data: null, loading: false, error: error.message }); });
    return () => controller.abort();
  }, [id]);
  return state;
}

export function useCategories() {
  const [state, setState] = useState({ data: [], loading: true });
  useEffect(() => { fetch(`${API}/products/category-list`).then((response) => response.json()).then((data) => setState({ data, loading: false })).catch(() => setState({ data: [], loading: false })); }, []);
  return state;
}