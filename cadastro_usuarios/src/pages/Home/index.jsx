
import './style.css'
import Lixeira from '../../assets/lixeira_peq.svg'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'

function Home() {
   const [usuarios, setUsuarios] = useState([])

   const inputNome = useRef()
   const inputEmail = useRef()
   const inputIdade = useRef()
   
   async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
   }

   async function createUsuarios(){
    await api.post('/cadastro',{
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value
    })
    getUsuarios()
   }

   

   useEffect(()=>{
    getUsuarios()

   },[])


  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name='nome' type='text'  ref={inputNome}/>
        <input placeholder='Digite sua idade' name='idade' type='number' ref={inputIdade} />
        <input placeholder='Digite seu email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsuarios}>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: <span>{usuario.nome}</span></p>
            <p>Idade: <span>{usuario.idade}</span></p>
            <p>Email: <span>{usuario.email}</span></p>
          </div>
          <button>
            <img src={Lixeira} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home