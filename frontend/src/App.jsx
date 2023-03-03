import { Table, Container, Button } from 'react-bootstrap'
import contents_api from './api/contents_api'
import { useEffect, useState } from 'react'
import Create_content_modal from './components/Create_content_modal'
import Update_content_modal from './components/Update_content_modal'

function App() {
  const [contents, set_contents] = useState()
  const [is_create_modal_open, set_is_create_modal_open] = useState(false)
  const [is_update_modal_open, set_is_update_modal_open] = useState(false)
  const [selected_content, set_selected_content] = useState()

  const handle_close_create_modal = () => set_is_create_modal_open(false);
  const handle_show_create_modal = () => set_is_create_modal_open(true);

  const handle_close_update_modal = () => set_is_update_modal_open(false);
  const handle_show_update_modal = () => set_is_update_modal_open(true);

  useEffect(() => {
    async function get_data() {
      await contents_api().get_contents().then(data => {
        return data.json()
      })
      .then(data => {
        set_contents(data)
      })
    }

    get_data()
  }, [])

  async function delete_content(content_id) {
    try {
      await contents_api().delete_content(content_id)

      const formatted_contents = contents.filter(cont => {
        if(cont.id !== content_id){
          return cont
        }
      })

      set_contents(formatted_contents)
    } catch(error) {
      throw error
    }
  }

  async function create_content(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await contents_api().create_content(
        req.nome.value, req.marca_propria.value, req.descricao.value, Number(req.preco.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        set_contents([...contents, {
          id: res.content_id,
          nome: req.nome.value,
          marca_propria: req.marca_propria.value,
          descricao: req.descricao.value,
          preco: Number(req.preco.value)
        }])

        set_is_create_modal_open(false)
      })
    } catch(error) {
      throw error
    }
  }

  async function update_content(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await contents_api().update_content(
        selected_content.id, req.nome.value, req.marca_propria.value, req.descricao.value, Number(req.preco.value)
      )

      const formatted_contents = contents.map(cont => {
        if(cont.id === selected_content.id) {
          return {
            id: selected_content.id,
            nome:  req.nome.value,
            marca_propria: req.marca_propria.value,
            descricao: req.descricao.value,
            preco: Number(req.preco.value)
          }
        }

        return cont
      })

      set_contents(formatted_contents)

      set_is_update_modal_open(false)
    } catch(error) {
      throw error
    }
  }

  return(
    <>

  
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-50
        w-50
        "
    >
      
      <button onClick={handle_show_create_modal} type="button" class="btn btn-outline-warning">ATUALIZAR PRODUTO</button>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Opções</th>
          </tr>
        </thead>

        <tbody>
          {contents && contents.map(cont => (
            <tr key={cont.id}>
              <td>{cont.nome}</td>
              <td>{cont.marca_propria}</td>
              <td>{cont.descricao}</td>
              <td>{cont.preco}</td>
              <td>
              <button onClick={() => {
                    handle_show_update_modal()
                    set_selected_content(cont)
                  }}type="button" class="btn btn-outline-success">Atualizar</button>
                <button onClick={() => delete_content(cont.id)}type="button" class="btn btn-outline-danger">Excluir</button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <Create_content_modal is_modal_open={is_create_modal_open} handle_close={handle_close_create_modal} create_content={create_content} />
    {selected_content && (
      <Update_content_modal is_modal_open={is_update_modal_open} handle_close={handle_close_update_modal} update_content={update_content} content={selected_content} />
    )}
    </>
  )
}

export default App
