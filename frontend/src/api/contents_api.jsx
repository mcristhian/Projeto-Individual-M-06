const contents_api = () => {
  const url = 'http://localhost:3000'

  return {
      get_contents () {
          return fetch(`${url}/produtos`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      delete_content (content_id) {
        return fetch(`${url}/produtos/${content_id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      create_content (nome, marca_propria, descricao, preco) {
        return fetch(`${url}/produtos`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              nome: nome,
              marca_propria: marca_propria,
              descricao: descricao,
              preco: preco
            }
          )
       })
      },
      update_content(content_id, nome, marca_propria, descricao, preco) {
        return fetch(`${url}/produtos/${content_id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              nome: nome,
              marca_propria: marca_propria,
              descricao: descricao,
              preco: preco
            }
          )
       })
      },
  }
}

export default contents_api
