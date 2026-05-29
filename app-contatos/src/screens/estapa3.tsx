import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

export default function ContatosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      {usuarios.map((user) => (
        <View key={user.id} style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
}