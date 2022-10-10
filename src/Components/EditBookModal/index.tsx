import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { requestAPI } from '../../Services';
import { IContext, MyContext } from '../../context/MyContext';
import style from './EditBookModal.module.css';

// Ctrl c Ctrl v do CreateBookModal
// Qdo sobrar tempo -> refatorar para aproveitar o mesmo componente

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
    categoryId: string
    bookId: string
}



const EditBookModal: React.FC<Props> = ({showModal, setShowModal, categoryId, bookId}) => {
  const {categories} = useContext(MyContext) as IContext;
  const [title, setTitle] = useState<string>('');
  const [newCategoryId, setNewCategoryId] = useState<string>(categoryId);
  const [file, setFile] = useState<File>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const validateEdit = () => {
    if (title && title.length < 5) return setIsDisabled(true);
    return setIsDisabled(false);
  };

  useEffect(() => {
    validateEdit();
  }, [title]);

  const editBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('PATCH', {categoryId: newCategoryId, title, file}, `books/${bookId}`, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    });
    window.location.reload();
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className={style.editForm}
        >
          <Form.Label>
            New title
            <Form.Control
              className={style.formInput} 
              type="text" 
              placeholder="title" 
              onChange={({target}) => setTitle(target.value)}
              value={title}
            />
          </Form.Label>
          <Form.Label> Category
            <Form.Select
              className={style.formSelect}
              value={newCategoryId}
              onChange={({target}) => setNewCategoryId(target.value)}
            >
              {categories.map(({category, id}) => (
                <option
                  key={id} 
                  value={id}>{category}</option>
              ))}
            </Form.Select>
          </Form.Label>
          <Form.Control type="file"
            onChange={({target}: any) => setFile(target.files[0])}
          ></Form.Control>
          <Container
            className={style.formContainer}
          >
            <Button
              className={style.formButton}
              onClick={() => editBook()}
              disabled={isDisabled}
            >Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;