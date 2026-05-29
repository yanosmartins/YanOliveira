import { supabase } from "./supabase";

export async function adicionarContato(nome: string, email: string) {
  const { data, error } = await supabase
    .from("contatos")
    .insert([{ nome, email }]);

  if (error) {
    console.log(error);
  }

  return data;
}


export async function listarContatos() {
     const { data, error } = await supabase
       .from("contatos")
       .select("*")
       .order("created_at", { ascending: false });
   
     if (error) {
       console.log(error);
     }
   
     return data;
   }