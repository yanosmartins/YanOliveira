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
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function listarContatos() {
    const { data, error } = await supabase
      .from('contatos')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setContatos(data || []);
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
      </View>

      {/* LISTA */}
      <ScrollView style={{ marginTop: 20 }}>
        {contatos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
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
});