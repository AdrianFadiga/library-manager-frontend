import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useContext, useEffect, useState } from 'react';
import { requestAPI } from '../../Services';
import { IContext, MyContext } from '../../context/MyContext';

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
  const [title, setTitle] = useState<string | undefined>('');
  const [newCategoryId, setNewCategoryId] = useState<string>(categoryId);
  const [file, setFile] = useState<File>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateEdit = () => {
    if (title && title.length < 5) return setIsDisabled(true);
    return setIsDisabled(false);
  };

  useEffect(() => {
    validateEdit();
  }, [title]);

  const editBook = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authLibrary') as string);
      let newTitle = title;
      if (title === '') newTitle = undefined;
      await requestAPI('PATCH', {categoryId: newCategoryId, title: newTitle, file}, `books/${bookId}`, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      });
      window.location.reload();
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err.data.message);  
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      {showError &&
      <Alert variant='primary'
        onClose={() => setShowError(false)}
        dismissible
      >
        {errorMessage}
      </Alert>
      }
      <Modal.Header closeButton>
        <Modal.Title>Edit book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>New title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="title" 
            onChange={({target}) => setTitle(target.value)}
            value={title}
          />
          <Form.Select
            value={newCategoryId}
            onChange={({target}) => setNewCategoryId(target.value)}
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
          onClick={() => editBook()}
          disabled={isDisabled}
        >Submit</Button>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;