import './style.css'
import Lixeira from '../../assets/lixeira_peq.svg'

function Home() {
  const usuarios = [{
    id: 'jhfdjhjsdhfjh',
    nome: 'Teste',
    idade: 30,
    email: 'teste@email.com'
  }, {
    id: '1374878ehhwe',
    nome: 'Aline',
    idade: 28,
    email: 'aline@email.com'
  }]
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name='nome' type='text' />
        <input placeholder='Digite sua idade' name='idade' type='number' />
        <input placeholder='Digite seu email' name='email' type='email' />
        <button type='button'>Cadastrar</button>
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