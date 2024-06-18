import Icon from "../../Icon/Icon";
import css from "./IconGroup.module.css";
import clsx from "clsx";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import EditCard from "../../EditCard/EditCard";
import { deleteCard } from "../../../redux/features/boardss/operations";
import { Tooltip } from "react-tooltip";
import CardTooltip from "../CardTooltip/CardTooltip";

const IconGroup = ({ theme, bellIconColor, card, card: { _id } }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log();
    dispatch(deleteCard(_id));
  };
  const handleOpen = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const whiteTheme = theme === "dark" ? "" : "white";
  return (
    <>
      <ul className={css.iconList}>
        <li className={clsx(css.li, css.margin)}>
          <Icon
            className={clsx(css.iconBell, css[theme], css[bellIconColor])}
            width="16px"
            height="16px"
            id="icon-bell"
          />
        </li>

        <li className={css.li}>
          <a id={`clickable-${card._id}`}>
            <button className={css.button}>
              <Icon
                className={clsx(css.icon, css[whiteTheme], css[theme])}
                width="16px"
                height="16px"
                id="icon-arrow-circle-broken-right"
              />
            </button>
          </a>
          <Tooltip anchorSelect={`#clickable-${card._id}`} clickable>
            <CardTooltip theme={theme} card={card} />
          </Tooltip>
        </li>
        <li className={css.li}>
          <button
            className={css.button}
            onClick={handleOpen}
            type="button"
            aria-label="Edit the card"
          >
            <Icon
              className={clsx(css.icon, css[whiteTheme], css[theme])}
              width="16px"
              height="16px"
              id="icon-pencil"
            />
          </button>
        </li>
        <li className={css.li}>
          <button
            className={css.button}
            onClick={handleDelete}
            type="button"
            aria-label="Delete the card"
          >
            <Icon
              className={clsx(css.icon, css[whiteTheme], css[theme])}
              width="16px"
              height="16px"
              id="icon-trash"
            />
          </button>
        </li>
      </ul>
      {modalIsOpen && (
        <EditCard
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          card={card}
        />
      )}
    </>
  );
};
export default IconGroup;
