import { useContext } from "react"; // eslint-disable-line
import Button from '@mui/material/Button'; // eslint-disable-line
import Stack from '@mui/material/Stack'; // eslint-disable-line
import TextField from '@mui/material/TextField'; //eslint-disable-line
import { ErrorMessage, Field, Form, Formik } from "formik"; //eslint-disable-line
import * as yup from "yup"; // eslint-disable-line
import "./style.css"; // eslint-disable-line
import { Link } from "react-router-dom"; // eslint-disable-line
import { AuthContext } from "../../contexts/auth"; // eslint-disable-line
export default function SingIn() {
  const { singIn, loadingAuth } = useContext(AuthContext);

  const addressSchema = yup.object().shape({
    email: yup
      .string()
      .required('Preencha todos os campos!') // eslint-disable-line
      .max(70, 'Máximo de caracteres excedido (70)'), // eslint-disable-line
    password: yup
      .string()
      .required('Preencha todos os campos!') // eslint-disable-line
      .min(8, 'Minimo de caracteres (8)') // eslint-disable-line
      .max(70, 'Máximo de caracteres excedido (70)'), // eslint-disable-line
  });

  const handleSubmit = async (values) => {
    await singIn(values.email, values.password);
  };

  return (
    <div className="container-singIn">
      <div className="div-image-singIn">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/projeto-taugor-686f0.appspot.com/o/aplicationAssets%2Fmarca-taugor.png?alt=media&token=e3c5c2ec-ee78-4480-b289-b398dbd893be"
          alt=""
        />
      </div>
      <Formik
        initialValues={{
          email: '', // eslint-disable-line
          password: '', // eslint-disable-line
        }}
        onSubmit={handleSubmit}
        validationSchema={addressSchema}
      >
        <Form className="form-singIn">
          <Stack spacing={3} direction="column">
            <label htmlFor="email">
              <Field
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                as={TextField}
              />
              <span>
                <ErrorMessage name="email" />
              </span>
            </label>
            <label htmlFor="password">
              <Field
                id="outlined-basic"
                label="Senha"
                variant="outlined"
                type="password"
                name="password"
                as={TextField}
              />
              <span>
                <ErrorMessage name="password" />
              </span>
            </label>
            <Button variant="contained" type="submit">
              {loadingAuth ? "Carregando..." : "Entrar"} {/* eslint-disable-line */ }
            </Button>
            <Link to="/register"> Criar uma conta!</Link>
          </Stack>
        </Form>
      </Formik>
    </div>
  );
}
