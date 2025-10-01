import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials missing. Please check your .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  },
});

// ====================
// PRODUCTS TABLE
// ====================
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// ====================
// SLIDERS TABLE
// ====================
export const getMainSliders = async () => {
  const { data, error } = await supabase
    .from("main_sliders")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

// ====================
// CATEGORIES TABLE
// ====================
export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
};

export const getCategoryByName = async (name) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", name)
    .single();
  if (error) throw error;
  return data;
};

// ====================
// BRANDS TABLE
// ====================
export const getBrands = async () => {
  const { data, error } = await supabase.from("brands").select("*");
  if (error) throw error;
  return data;
};

export const getBrandByName = async (name) => {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("name", name)
    .single();
  if (error) throw error;
  return data;
};

// ====================
// DESIGNS TABLE
// ====================
export const getDesigns = async () => {
  const { data, error } = await supabase
    .from("designs")
    .select("id, img_url")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

// ====================
// ADVANCED QUERIES
// ====================
export const getProductsByCategory = async (category) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);
  if (error) throw error;
  return data;
};

export const getProductsByBrand = async (brand) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("vendor", brand);
  if (error) throw error;
  return data;
};

// ====================
// SOFTWARES TABLE
// ====================
export const getSoftwares = async () => {
  const { data, error } = await supabase.from("softwares").select("*");
  if (error) throw error;
  return data;
};

// ====================
// SECTIONS TABLE
// ====================
export const getSections = async () => {
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
};
