import axios from 'axios';
import { toast } from 'react-toastify';

export async function BuscaEndereco(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error: any) {
    toast.warning('Cep informado é inválido');
  }
}
