import { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(name, number);
        setName('')
        setNumber('')
    }

    const handleChange = e => {
        // this.setState({ [e.currentTarget.name]: e.currentTarget.value });

        switch (e.currentTarget.name) {
            case 'name':
                setName(e.currentTarget.value)
                break;
            case 'number':
                setNumber(e.currentTarget.value)
                break;
        
            default:
                break;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label className={css.label}>
        Name
        <input
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        onChange={handleChange}
        />

        </label>
            
        <label className={css.label}>
            Number
            <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange}
            />

        </label>

            <button type="submit" className={css.submit}>Add name</button>
    </form>
    )
}

export default ContactForm