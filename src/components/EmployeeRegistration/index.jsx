import React, { useState } from 'react';
import { storage, db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';
import EmployeeForm from '../Employeeform/EmployeeForm';
import PDFGenerator from '../PDFGenerator/PDFGenerator'; // Importe o novo componente aqui
import logo from '../../assets/images/marca.png';
import user from '../../assets/images/user.png';
import './style.css';

export default function EmployeeRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    address: '',
    phone: '',
    birthDayMonth: '',
    position: '',
    hireDate: '',
    department: '',
    salary: '',
    history: [],
  });

  const [imageAvatar, setImageAvatar] = useState(null);
  const [path, setPath] = useState()

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const image = e.target.files[0];
      setImageAvatar(URL.createObjectURL(image));
      const imageFile = files[0];
      setPath(imageFile.name)
      const uploadTask = uploadBytesResumable(
        ref(storage, `${formData.name}/${imageFile.name}`),
        imageFile,
      );
      uploadTask.on(
        'state_changed',
        (error) => {
          console.error('Erro ao fazer upload da imagem:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({
              ...formData,
              [name]: downloadURL,
            });
          });
        },
      );
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddEmployee = async () => {
    if (
      formData.name === '' ||
      formData.address === '' ||
      formData.address === '' ||
      formData.sex === '' ||
      formData.phone === '' ||
      formData.birthDayMonth === '' ||
      formData.position === '' ||
      formData.hireDate === '' ||
      formData.department === '' ||
      formData.salary === '' ||
      imageAvatar === null
    ) {
      alert('Preencha todos os campos!');
    } else {
      await addDoc(collection(db, 'funcionarios'), {
        name: formData.name,
        sex: formData.sex,
        address: formData.address,
        phone: formData.phone,
        birthDayMonth: formData.birthDayMonth,
        position: formData.position,
        hireDate: formData.hireDate,
        department: formData.department,
        salary: formData.salary,
      })
        .then(() => {
          alert('cadastrado');
        })
        .catch((err) => {
          console.log(err);
        });

      setFormData({
        name: '',
        sex: '',
        address: '',
        phone: '',
        birthDayMonth: '',
        position: '',
        hireDate: '',
        department: '',
        salary: '',
        history: [],
      });
      setImageAvatar(null);
    }
  };

  return (
    <div className="main-container">
      <div className="div-main-form">
        <div className='align-select-employee'>
          <EmployeeForm
            formData={formData}
            handleInputChange={handleInputChange}
            imageAvatar={imageAvatar}
            fileName={formData.name}
            defaultImage={user}
          />
          <Button variant="contained" onClick={handleAddEmployee}>
            Cadastrar
          </Button>
        </div>
      </div>

      <div className="div-main-pdf">
        {formData.name && (
          <PDFGenerator
            employeeData={formData}
            fileName={`${formData.name}/${path}`}
            logo={logo}
            imageAvatar={imageAvatar}
          />
        )}
      </div>
    </div>
  );
}
