import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { ICategory } from '../../Interfaces/ICategory';
import { IContext, MyContext } from '../../context/MyContext';
import { requestAPI } from '../../Services';
import { IBook } from '../../Interfaces/IBook';
import style from './FilterModal.module.css';

interface Props {
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
    categories: ICategory[]
}

const FilterModal: React.FC<Props> = ({showModal, setShowModal, categories}) => {
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>(categories[0].id);
  const { setBooks, setShowRemoveFilterButton } = useContext(MyContext) as IContext; 

  const findByQuery = async (parameter: string, query: string) => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<IBook[]>('GET', {}, `books/filter?${parameter}=${query}`, {
      Authorization: `Bearer ${token}`
    });
    setBooks(response.data);
    setShowRemoveFilterButton(true);
  };

  return (
    <Modal 
      show={showModal} onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Looking for a book?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className={style.form}
        >
          <Form.Label>
                Filter by title
            <Form.Control 
              type="text" 
              placeholder="Title" 
              onChange={({target}) => setTitle(target.value)}
              value={title}
              className={style.formInput}
            />
          </Form.Label>
          <Container
            className={style.formContainer}
          >
            <Button
              disabled={!title}
              className={style.formButton}
              onClick={() => findByQuery('title', title)}>
            Filter
            </Button>
          </Container>
          <Form.Label>
        Filter by category
            <Form.Select
              value={categoryId}
              onChange={({target}) => setCategoryId(target.value)}
              className={style.formSelect}
            >
              {categories.map(({category, id}) => (
                <option
                  key={id} 
                  value={id}>{category}</option>
              ))}
            </Form.Select>
          </Form.Label>
          <Container
            className={style.formContainer}>
            <Button
              className={style.formButton}
              onClick={() => findByQuery('categoryId', categoryId)}>
            Filter
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;