import { useState } from "react";
import { SelectOption, SelectProps } from "../types";
import styles from "./select.module.css";

function Select({ options, value, onChange, disabled }: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  function selectOption(option: SelectOption) {
    onChange(option);
  }
  return (
    <div
      onClick={() => setIsFocused((prev) => !prev)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.value}>{value.label}</span>

      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isFocused ? styles.show : ""}`}>
        {options
          .filter((option) => option != value)
          .map((option) => (
            <li
              onClick={(e) => {
                selectOption(option);
              }}
              key={option.label}
              className={`${styles.option} ${styles.highlighted}`}
            >
              {option.label}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Select;
