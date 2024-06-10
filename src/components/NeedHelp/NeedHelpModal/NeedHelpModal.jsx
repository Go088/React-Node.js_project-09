import css from "./NeedHelpModal.module.css";
import * as Yup from "yup";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../../Icon/Icon";
//import { useDispatch, useSelector } from "react-redux";
//import { selectIsNeedHelpModalOpen } from "../../../redux/features/modals/selectors";
//import { openModal } from "../../../redux/features/modals/needHelpModalSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("You should enter a valid email")
    .trim()
    .required("Required"),
  comment: Yup.string().min(3, "Too short!").trim().required("Required"),
});

export const NeedHelpModal = () => {
  const themeType = "dark";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      comment: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    //dispatch(helpComment(data));
    reset();
  };
  return (
    <div className={clsx(css.helpModal, css.isOpen, css[themeType])}>
      <h2 className={clsx(css.helpModalTitle, css[themeType])}>Need help</h2>

      <Icon
        id=""
        className={clsx(css.helpModalIcon, css[themeType])}
        width="18"
        height="18"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={clsx(css.helpFormInput, css[themeType])}
            {...register("email")}
            type="email"
            placeholder="Email address"
          />
          {errors.email && (
            <p className={clsx(css.error, css[themeType])} role="alert">
              {errors.email.message}
            </p>
          )}
          <textarea
            className={clsx(css.helpFormTextarea, css[themeType])}
            {...register("comment")}
            type="text"
            placeholder="Comment"
          />
          {errors.comment && (
            <p className={clsx(css.error, css[themeType])} role="alert">
              {errors.comment.message}
            </p>
          )}
        </div>
        <button
          className={clsx(css.helpModalButton, css[themeType])}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};
