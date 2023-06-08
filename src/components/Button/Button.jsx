import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
