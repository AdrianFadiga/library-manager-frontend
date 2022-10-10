import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ICategory } from '../../Interfaces/ICategory';
import { requestAPI } from '../../Services';

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
        <Modal.Title>Add book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Book title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="title" 
            onChange={({target}) => setTitle(target.value)}
            value={title}
          />
          <Form.Select
            value={categoryId}
            onChange={({target}) => setCategoryId(target.value)}
          >
            {categories.map(({category, id}) => (
              <option
                key={id} 
                value={id}>{category}</option>
            ))}
          </Form.Select>
          <Form.Control type="file"
            onChange={({target}: any) => setFile(target.files[0])}
          ></Form.Control>
        </Form>
        <Button
          disabled={isDisabled}
          onClick={() => createBook()}
        >Submit</Button>
      </Modal.Body>
    </Modal>
  );
};

export default CreateBookModal;