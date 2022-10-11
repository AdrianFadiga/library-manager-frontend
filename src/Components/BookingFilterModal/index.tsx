import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IBook } from '../../Interfaces/IBook';
import { IUser } from '../../Interfaces/IUser';
import { useEffect, useState } from 'react';


interface Props {
  showFilterModal: boolean
  setShowFilterModal: (value: boolean) => void
  action: (query: string) => Promise<void>
  setQuery: (value: string) => void
  books: IBook[]
  users: IUser[]
  role: string
}

const BookingFilterModal: React.FC<Props> = ({
  action, showFilterModal, setShowFilterModal, books, users, role
}) => {
  const initialState = ({
    status: 'status=active',
    bookQuery: '&',
    bookId: books[0]?.id,
    userQuery: '&',
    userId: users[0]?.id,
  });
  const [filterParams, setFilterParams] = useState<any>(initialState);

  useEffect(() => {
    setFilterParams(initialState);
  }, [books]);

  const queryBuilder = () => {
    const {status, bookQuery, bookId, userQuery, userId} = filterParams;
    const query = `${status}&${bookQuery}${bookId}&${userQuery}${userId}`;
    return query;
  };

  return (
    <Modal 
      show={showFilterModal} 
      onHide={() => {
        setShowFilterModal(false);
        setFilterParams(initialState);
      }}
      style={{
        display: 'grid',
        justifyContent: 'end',
        marginBottom: '10px',
        marginTop: '10px'
      }}
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <Form
          style={{
            display: 'flex', 
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <Form.Check 
            type="radio"
            value="active"
            label="active"
            name="status"
            defaultChecked={true}
            onChange={() => setFilterParams({
              ...filterParams,
              status: 'status=active'
            })}
          />
          <Form.Check 
            type="radio"
            value="finished"
            label="finished"
            name="status"
            onChange={() => setFilterParams({
              ...filterParams,
              status: 'status=finished'
            })}
          />
        </Form>
        <Form>
          <Form.Group>
            <Form.Check 
              type="switch"
              label="Filter by book"
              onChange={({target}) => setFilterParams({
                ...filterParams,
                bookQuery: target.checked ? 'bookId=' : ''
              })}
            />
            <Form.Select
              onChange={({target}) => setFilterParams({
                ...filterParams,
                bookId: target.value
              })}
            >
              {books.map(({title, id}) => (
                <option 
                  key={id}
                  value={id}
                >
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {
            role === 'admin' &&
            <Form.Group>
              <Form.Check 
                type="switch"
                label="Filter by user"
                onChange={({target}) => setFilterParams({
                  ...filterParams,
                  userQuery: target.checked ? 'userId=' : ''
                })}
              />
              <Form.Select
                onChange={({target}) => setFilterParams({
                  ...filterParams,
                  userId: target.value
                })}
              >
                {users.map(({id, name}) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          }
        </Form>
        <Button
          onClick={() => action(queryBuilder())}>
          Filter
        </Button>
      </Modal.Body>
    </Modal>  
  );
};

export default BookingFilterModal;