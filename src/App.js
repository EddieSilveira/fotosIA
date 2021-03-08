import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import Carregando from '../src/images/Spinner-1s-200px.gif'

function App() {
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState (facilitador para getter/setter)
  const [pessoas, setPessoas] = useState([]) //[] inicial. com uma matriz
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo]   = useState('')
  const [hairColor, setHairColor] = useState('')
  const [eyeColor, setEyeColor] = useState('')

  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }

  async function obtemFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''
    const filtraSexo  = sexo.length  > 0 ? `&gender=${sexo}` : ''
    const filtraCorOlho = eyeColor.length > 0 ? `&eye color=${eyeColor}` : ''
    const filtraCorCabelo = hairColor.length > 0 ? `&hair color=${hairColor}` : ''
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}${filtraSexo}${filtraCorOlho}${filtraCorCabelo}&order_by=random`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
        //console.log(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição ' + error.message)
      })
    setCarregando(false)
  }


  return (
    <div className="app">
      <h1>Gerador de Fotos com IA</h1>
      <Robot />
      {carregando &&
        <img src={Carregando} title="Aguarde..." alt="Aguarde" width="50" />
      }
      <div className='linha'>
        <ListaPessoas pessoas={pessoas} />
      </div>

      <div className= 'linha'>
      <label>Idade:</label>
      <select onChange={event => setIdade(event.target.value)}>
        <option value="">Todas</option>
        <option value="infant">Infantil</option>
        <option value="child">Criança</option>
        <option value="young-adult">Jovem</option>
        <option value="adult">Adulto</option>
        <option value="elderly">Idoso</option>
      </select>
      <label>Etnia:</label>
          <select onChange={event => setEtnia(event.target.value)}>
            <option value="">Todas</option>
            <option value="white">Branca</option>
            <option value="latino">Latina</option>
            <option value="asian">Asiática</option>
            <option value="black">Negra</option>
          </select>
      <label>Sexo:</label>
          <select onChange={event => setSexo(event.target.value)}>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>  
      <label>Cor dos olhos:</label>
          <select onChange={event => setEyeColor(event.target.value)}>
            <option value="black">Preto</option>
            <option value="brown">Castanho</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
          </select>
      <label>Cor do cabelo:</label>
          <select onChange={event => setHairColor(event.target.value)}>
            <option value="brunette">Preto</option>
            <option value="brown">Castanho</option>
            <option value="blonde">Loiro</option>
            <option value="red-haired">Ruivo</option>
          </select>
        </div>
      <div className='linha'>
        <button type='button' onClick={obtemFoto}>
          Obter Imagens
        </button>
        {pessoas.length > 0 &&
        <button type='button' onClick={() => setPessoas([])}>
          Limpar Imagens
        </button>
        }
      </div>
    </div>
  )
}

export default App;