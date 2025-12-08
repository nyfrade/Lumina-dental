import React from 'react';
import styles from './input.module.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={props.id || label}>{label}</label>}
      <input
        type={type}
        id={props.id || label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.inputField}
        {...props}
      />
    </div>
  );
};

export default Input;
