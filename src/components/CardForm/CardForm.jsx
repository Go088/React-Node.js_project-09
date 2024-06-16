import { useId } from "react";
import { useState } from "react";
import css from "./CardForm.module.css";
import clsx from "clsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Icon from "../Icon/Icon";
import Calendar from "../Calendar/Calendar";
// import { useDispatch } from 'react-redux';
// import { addCard } from "../../redux/features/cards/operations";

const labels = [
  {
    value: "low",
    color: "blue",
  },
  { value: "medium", color: "pink" },
  {
    value: "high",
    color: "green",
  },
  {
    value: "without priority",
    color: "grey",
  },
];

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 characters")
    .trim(),
  description: yup
    .string()
    .required("Description is required")
    .min(2, "Description should be at least 2 characters")
    .trim(),
});

export default function CardForm({ isOpen, onRequestClose }) {
const [deadline, setDeadline] = useState(new Date().getTime());

  const handleDateChange = (date) => {
    setDeadline(date);
    setValue("deadline", date);
    // console.log(date);
    // console.log(deadline);
  };

  const themeType = "dark";
  const labelFieldId = useId();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      deadline,
    },
  });
  // const dispatch = useDispatch()

  const onSubmit = (data) => {
    // dispatch(addCard(data))
    console.log(data);
    reset();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.Modal}
      overlayClassName={css.Overlay}
      contentLabel="Modal window for create a new card"
    >
      <form
        className={clsx(css.form, css[themeType])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className={clsx(css.title, css[themeType])}>Add card</h3>
        <h4 className={css.visuallyHidden}>Title</h4>
        <input
          className={clsx(css.input, css[themeType])}
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <p className={clsx(css.error, css.errorTitle, css[themeType])}>
          {errors.title?.message}
        </p>
        <h4 className={css.visuallyHidden}>Description</h4>
        <div className={css.textareaWrappper}>
          <textarea
            className={clsx(css.textarea, css[themeType])}
            {...register("description")}
            type="text"
            placeholder="Description"
          />
          <p className={clsx(css.error, css.errorTextarea, css[themeType])}>
            {errors.description?.message}
          </p>
        </div>
        <p className={clsx(css.subtitle, css[themeType])}>Label color</p>
        <ul className={css.labelList}>
          {labels.map((label) => (
            <li className={css.labelItem} key={labels.indexOf(label)}>
              <input
                className={clsx(css.radioLabel, css.visuallyHidden)}
                id={`${labelFieldId}${labels.indexOf(label)}`}
                {...register("priority", { required: true })}
                type="radio"
                value={label.value}
              />
              <label
                className={css.labelLabel}
                htmlFor={`${labelFieldId}${labels.indexOf(label)}`}
              >
                <div
                  className={clsx(
                    css.labelIcon,
                    css[label.color],
                    css[themeType]
                  )}
                >
                  <span className={css.labelCheked}></span>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <p className={clsx(css.subtitle, css[themeType])}>Deadline</p>
        <Calendar onDateChange={handleDateChange} />
        <button className={clsx(css.btn, css[themeType])} type="submit">
          <div className={clsx(css.btnWrapIcon, css[themeType])}>
            <Icon
              className={clsx(css.btnIcon, css[themeType])}
              width={14}
              height={14}
              id={"icon-plus_card_modal"}
            />
          </div>
          <span>Add</span>
        </button>
      </form>
      <button
        className={clsx(css.btnClose, css[themeType])}
        type="button"
        onClick={onRequestClose}
      >
        <Icon
          className={clsx(css.btnCloseIcon, css[themeType])}
          width={18}
          height={18}
          id={"icon-x-close_modal"}
        />
      </button>
    </Modal>
  );
}