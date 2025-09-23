
import './style.css'
import Lixeira from '../../assets/lixeira.png'
import Lapis from '../../assets/fer.png'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'

function Home() {
   const [usuarios, setUsuarios] = useState([])
   const [editandoId, setEditandoId] = useState(null)
   const inputNome = useRef()
   const inputEmail = useRef()
   const inputIdade = useRef()
   
   async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
   }   

   useEffect(()=>{
    getUsuarios()

   },[])

   function resetForm() {
    inputNome.current.value = ''
    inputEmail.current.value = ''
    inputIdade.current.value = ''
    setEditandoId(null)
  }

   async function createUsuarios(){
    if (editandoId) {
      await api.put(`/cadastro/${editandoId}`, {
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value
      })
    } else {
      await api.post('/cadastro', {
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value
      })
    }
    getUsuarios()
    resetForm()
  }

   async function deleteUsuarios(id){
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
   }

   function atualizaUsuarios(usuario) {
    inputNome.current.value = usuario.nome;
    inputEmail.current.value = usuario.email;
    inputIdade.current.value = usuario.idade;
    setEditandoId(usuario.id);
  }


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name='nome' type='text'  ref={inputNome}/>
        <input placeholder='Digite sua idade' name='idade' type='number' ref={inputIdade} />
        <input placeholder='Digite seu email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsuarios}>{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button onClick={ ()=> deleteUsuarios(usuario.id)}>
            <img src={Lixeira} />
          </button>
          <button onClick={ ()=> atualizaUsuarios(usuario)}>
            <img src={Lapis} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home