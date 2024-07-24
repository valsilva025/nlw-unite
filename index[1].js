let participantes = [
  
  {
    nome: "Valdinéia Silva",
    email: "valdineia@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 20),
    dataCheckIn: new Date(2024, 1, 5, 20, 20)
  },
  {
    nome: "Mariana Oliveira",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 15, 30),
    dataCheckIn: new Date(2024, 3, 15, 18, 0)
  },
  {
    nome: "Rafael Santos",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 4, 5, 10, 0),
    dataCheckIn: null
  },
  {
    nome: "Ana Carolina Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 5, 18, 14, 45),
    dataCheckIn: new Date(2024, 5, 22, 16, 0)
  },
  {
    nome: "Pedro Machado",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 6, 3, 8, 0),
    dataCheckIn: null
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 7, 20, 17, 30),
    dataCheckIn: new Date(2024, 7, 25, 19, 0)
  },
  {
    nome: "Fernando Costa",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 8, 8, 12, 15),
    dataCheckIn: null
  },
  {
    nome: "Lúcia Almeida",
    email: "lucia@gmail.com",
    dataInscricao: new Date(2024, 9, 1, 9, 30),
    dataCheckIn: new Date(2024, 9, 5, 11, 0)
  },
  {
    nome: "Rodrigo Barbosa",
    email: "rodrigo@gmail.com",
    dataInscricao: new Date(2024, 10, 12, 20, 0),
    dataCheckIn: new Date(2024, 10, 15, 22, 30)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao=dayjs(Date.now())
  .to(participante.dataInscricao)
   
   let dataCheckIn=dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn= `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>
        ${dataInscricao}
      </td>
      <td>
        ${dataCheckIn}
      </td>
    </tr>
    `
}

const atualizarLista = (participantes) =>{
  let output = ""
  // estrutura de repetição
  for(let participante of participantes) {
   output = output + criarNovoParticipante(participante)
  }


  // substituir infromação do HTML
  document.querySelector('tbody').innerHTML= output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'), 
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
 const participanteExiste = participantes.find((p) => p.email == participante.email
)
 if(participanteExiste){
   alert('E-mail já cadastrado!')
   return
 }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return 
  }
  // encontar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participantes
  atualizarLista(participantes)
}

