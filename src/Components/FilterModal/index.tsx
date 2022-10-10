import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICategory } from '../../Interfaces/ICategory';
import { IContext, MyContext } from '../../context/MyContext';
import { requestAPI } from '../../Services';
import { IBook } from '../../Interfaces/IBook';

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
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Looking for a book?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>
                Find by title
            <Form.Control 
              type="text" 
              placeholder="Title" 
              onChange={({target}) => setTitle(target.value)}
              value={title}
              style={{maxWidth: '200px'}}
            />
            <Button
              onClick={() => findByQuery('title', title)}>
            Find
            </Button>
          </Form.Label>
        </Form>
        <Form>
          <Form.Label>
        Find by category
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
          </Form.Label>
          <Button
            onClick={() => findByQuery('categoryId', categoryId)}>
            Find
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;