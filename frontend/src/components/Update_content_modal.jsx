import { Modal, Button, Form } from 'react-bootstrap'
function Update_content_modal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.is_modal_open}>
        <Form onSubmit={(event) => {
          props.update_content(event)
        }}>
        <Modal.Header closeButton onClick={props.handle_close}>
          <Modal.Title>Atualizar produto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="nome">
            <Form.Label>
              Nome
            </Form.Label>
            <Form.Control defaultValue={props.content.nome} type="text" />
          </Form.Group>

          <Form.Group controlId="marca_propria">
            <Form.Label>
              Produto
            </Form.Label>
            <Form.Control defaultValue={props.content.marca_propria} type="text" />
          </Form.Group>

          <Form.Group controlId="descricao">
            <Form.Label>
              Descrição
            </Form.Label>
            <Form.Control defaultValue={props.content.descricao} type="text" />
          </Form.Group>

          <Form.Group controlId="preco">
            <Form.Label>
              Preço
            </Form.Label>
            <Form.Control defaultValue={props.content.preco} type="number" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.handle_close}>Cancelar</Button>
          <Button variant="success" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default Update_content_modal
