import css from "./Header.module.css";
import layout from "../Layout/Layout.module.css";
import clsx from "clsx";
import Icon from "../Icon/Icon";
export const Header = () => {
  const themeType = "dark";
  return (
    <div
      className={clsx(layout.container, css.headerContainer, css[themeType])}
    >
      <svg
        className={clsx(css.mobileMenuIcon, css[themeType])}
        width="24"
        height="24"
      >
        <use href="/src/sprite.svg#icon-help-circle"></use>
      </svg>
      <div className={css.infoWrapper}>
        <div className={css.themeWrapper}>
          <p className={clsx(css.selectTitle, css[themeType])}>Theme</p>
          <Icon
            className={clsx(css.selectThemeIcon, css[themeType])}
            id="icon-bell"
            width="16"
            height="16"
          />
          <ul className={clsx(css.themeList, css.isOpen, css[themeType])}>
            <li className={clsx(css.themeListItem, css[themeType], css.active)}>
              Light
            </li>
            <li className={clsx(css.themeListItem, css[themeType])}>Dark</li>
            <li className={clsx(css.themeListItem, css[themeType])}>Violet</li>
          </ul>
        </div>

        <div className={css.userWrapper}>
          <p className={clsx(css.userName, css.css[themeType])}>Ivetta</p>
          <div className={css.avatarWrapper}>
            <img src="/img/user.png" alt="Avatar"></img>
          </div>
        </div>
      </div>
    </div>
  );
};
