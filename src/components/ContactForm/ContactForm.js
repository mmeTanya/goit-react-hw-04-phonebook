import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

function ContactForm({ onSubmited }) {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {

    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmited(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className="form__field">
        <label className="form__label" htmlFor="number">
          Number
        </label>
        <input
          className="form__input"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="number"
          value={number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="form__btn">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmited: PropTypes.func.isRequired,
};

export default ContactForm;
