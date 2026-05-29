import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { supabase } from '../services/supabase';

type Contato = {
  id: number;
  nome: string;
  email: string;
};

export default function ContatosScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [lista, setLista] = useState<any[]>([]);

    async function listarContatos() {
    const { data, error } = await supabase
      .from('contatos')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setLista(data || []);
  }

  async function adicionarContato() {
    if (!nome || !email) return;

    const { error } = await supabase
      .from('contatos')
      .insert([{ nome, email }]);

    if (error) {
      console.log(error);
      return;
    }

    setNome('');
    setEmail('');
    listarContatos();
  }

  async function consumirApi() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
  
      const data = await response.json();
  
      setLista(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function adicionarUsuarioDaApi(user: any) {
    const { error } = await supabase
      .from('contatos')
      .insert([
        {
          nome: user.name,
          email: user.email,
        },
      ]);
  
    if (error) {
      console.log(error);
      return;
    }
  
    alert('Contato adicionado ao Supabase!');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>📒 Contatos</Text>

      {/* INPUTS */}
      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={adicionarContato}>
          <Text style={styles.buttonText}>Adicionar contato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={listarContatos}
        >
          <Text style={styles.buttonText}>Listar contatos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#dc2626' }]}
          onPress={consumirApi}
        >
  <Text style={styles.buttonText}>Consumir API</Text>
</TouchableOpacity>
      </View>

      {/* LISTA */}
      <ScrollView style={{ marginTop: 20 }}>
  {lista.map((item) => (
    <View key={item.id} style={styles.card}>
      <Text style={styles.name}>
        {item.nome || item.name}
      </Text>

      <Text style={styles.email}>
        {item.email}
      </Text>

      {item.name && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => adicionarUsuarioDaApi(item)}
        >
          <Text style={styles.buttonText}>
            Adicionar ao Supabase
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ))}
</ScrollView>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  form: {
    gap: 10,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  button: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#16a34a',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  email: {
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2563eb',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});


