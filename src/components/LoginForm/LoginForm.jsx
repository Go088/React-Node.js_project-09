import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/features/auth/operations";
import css from "./LoginForm.module.css";

// Схема валідації
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(/^\S*$/, "Email should not contain spaces")
    .matches(/^[\S].*[\S]$/, "Email cannot start or end with whitespace")
    .email("Email is invalid"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .min(6, "Name should be at least 6 characters"),
});

// Форма
const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (userData) => {
    console.log(JSON.stringify(userData));
    dispatch(logIn(userData));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label>
          <input
            className={css.input}
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label>
          <input
            className={css.input}
            type="password"
            {...register("password")}
            placeholder="Confirm a password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>

        <input type="submit" value={"Log In Now"} className={css.button} />
      </form>
    </div>
  );
};

export default LoginForm;
