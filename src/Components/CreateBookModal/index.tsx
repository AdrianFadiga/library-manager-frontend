import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { ICategory } from '../../Interfaces/ICategory';
import { requestAPI } from '../../Services';
import style from './CreateBookModal.module.css';

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
    categories: ICategory[]
}

const CreateBookModal: React.FC<Props> = ({showModal, setShowModal, categories}) => {
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>(categories[0].id);
  const [file, setFile] = useState<File>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const createBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {categoryId, title, file}, 'books', {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    });
    window.location.reload();
  };

  const validateCreateBook = () => {
    const FIVE_MB = 5000000;
    const validate = (
      !file?.type.includes('image') 
      || file?.size > FIVE_MB
      || title.length < 3
      || !categoryId
    );
    setIsDisabled(validate);
  };

  useEffect(() => {
    validateCreateBook();
  }, [title, categoryId, file]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title
          className={style.modalHeader}
        >
          Add book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={style.form}>
          <Form.Label
          >
            Book title
            <Form.Control
              className={style.formControl} 
              type="text" 
              placeholder="title" 
              onChange={({target}) => setTitle(target.value)}
              value={title}
            />
          </Form.Label>
          <Form.Label>
          Book category
            <Form.Select
              className={style.formSelect} 
              value={categoryId}
              onChange={({target}) => setCategoryId(target.value)}
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
          />
          <Container
            className={style.formContainer}>
            <Button
              className={style.button}
              disabled={isDisabled}
              onClick={() => createBook()}
            >
            Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBookModal;