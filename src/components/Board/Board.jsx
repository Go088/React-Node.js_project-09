import { useDispatch } from "react-redux";
import { deleteBoard } from "../../redux/features/boards/operations";
import css from "./Board.module.css";
import Icon from "../Icon/Icon";
import clsx from "clsx";
import EditBoard from "../EditBoard/EditBoard";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export const Board = ({ _id, title, icon }) => {
  const themeType = "dark";
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteBoard(_id));
  const handlEdit = () => dispatch(EditBoard({ _id }));
  const titleSVG = `icon-${icon.trim()}`;
  const [editIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleOpen = () => setIsOpen(true);

  return (
    <div className={clsx(css.wrapper, css[themeType], css.isActive)}>
      <div className={css.infoWrapper}>
        <Icon
          id={`icon-${titleSVG}`}
          width="18"
          height="18"
          className={css.titleSVG}
        />
        <h2 className={clsx(css.text, css[themeType], css.isActive)}>
          {title}
        </h2>
      </div>
      <div className={css.btnList}>
        <button type="button" className={css.button} onClick={handleOpen}>
          <Icon
            id="icon-pencil"
            width="16"
            height="16"
            className={clsx(css.LogoSVG, css.isActive)}
          />
        </button>
        <button type="button" className={css.button} onClick={handleDelete}>
          <Icon
            id="icon-trash"
            width="16"
            height="16"
            className={clsx(css.LogoSVG, css.isActive)}
          />
        </button>
        <div className={clsx(css.boxModel, css[themeType], css.isActive)}></div>
      </div>
      {editIsOpen && (
        <EditBoard
          isOpen={editIsOpen}
          onRequestClose={closeModal}
          onclick={handlEdit}
          _id={_id}
        />
      )}
    </div>
  );
};
