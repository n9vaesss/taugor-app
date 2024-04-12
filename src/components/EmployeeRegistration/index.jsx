import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import InputMask from 'react-input-mask';
import { db, storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import logo from '../../assets/images/marca.png';
import user from '../../assets/images/user.png'
import './style.css'

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { MdOutlineFileUpload } from 'react-icons/md';
import EmployeeForm from '../Employeeform/EmployeeForm';

export default function EmployeeRegistration() {
  const [employees, setEmployees] = useState([]);
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
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const image = e.target.files[0];
      setImageAvatar(URL.createObjectURL(image))
      const imageFile = files[0];
      setFileName(imageFile.name)
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

  const generatePDF = async (employeeData) => {
    const getImageURL = async (imageName) => {
      const storageRef = ref(storage, `${formData.name}/${imageName}`);
      try {
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.error('Erro ao obter a URL da imagem:', error);
        return null;
      }
    }
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const {
      name,
      sex,
      address,
      phone,
      birthDayMonth,
      position,
      hireDate,
      department,
      salary,
    } = employeeData;

    const color = rgb(0.1451, 0.5059, 0.7686);

    const loadBanner = await fetch(logo).then((res) => res.arrayBuffer());
    const banner = await pdfDoc.embedPng(loadBanner);
    page.drawImage(banner, {
      x: 50,
      y: 705,
      width: 150,
      height: 73.72,
    });
    page.drawText('FICHA DE CADASTRO', {
      x: 200,
      y: 670,
      size: 23,
    });

    try {
      if (await getImageURL(fileName)) {
        const imageURL = await getImageURL(fileName);
        const imageBytes = await fetch(imageURL).then((res) => res.arrayBuffer());
        const profileImage = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(profileImage, {
          x: 50,
          y: 520,
          width: 130,
          height: 130,
        });
      }
    } catch (error) {
      console.error('Erro ao obter a imagem:', error);
      const imageURL = await getImageURL(fileName);
      const imageBytes = await fetch('https://marketplace.canva.com/EAFvwKT4hbQ/1/0/1600w/canva-foto-de-perfil-para-facebook-simples-elegante-degrad%C3%AA-azul-preto-e-branco-XUOOnYPlf0Q.jpg').then((res) => res.arrayBuffer());
      const profileImage = await pdfDoc.embedJpg(imageBytes);
      page.drawImage(profileImage, {
        x: 50,
        y: 520,
        width: 130,
        height: 130,
      });
    }

    page.drawRectangle({
      x: 190,
      y: 520,
      width: 360,
      height: 130,
      borderWidth: 1,
      borderColor: rgb(0.1451, 0.5059, 0.7686),
    });
    page.drawText(`Informações pessoais`, {
      x: 200,
      y: 620,
      size: 20,
      color,
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    });
    page.drawText(`Nome:`, { x: 200, y: 600, size: 16 });
    page.drawText(`${name}`, { x: 250, y: 600, size: 16 });
    page.drawText(`Sexo:`, { x: 200, y: 580, size: 16 });
    page.drawText(`${sex}`, { x: 245, y: 580, size: 16 });
    page.drawText(`Aniversário:`, { x: 200, y: 560, size: 16 });
    page.drawText(`${birthDayMonth}`, { x: 285, y: 560, size: 16 });

    page.drawRectangle({
      x: 50,
      y: 400,
      width: 500,
      height: 100,
      borderWidth: 1,
      borderColor: rgb(0.1451, 0.5059, 0.7686),
    });

    page.drawText(`Contato`, {
      x: 60,
      y: 470,
      size: 20,
      color,
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    });
    page.drawText(`Endereço:`, { x: 60, y: 450, size: 16 });
    page.drawText(`${address}`, { x: 135, y: 450, size: 16 });
    page.drawText(`Telefone:`, { x: 60, y: 430, size: 16 });
    page.drawText(`${phone}`, { x: 130, y: 430, size: 16 });

    page.drawRectangle({
      x: 50,
      y: 250,
      width: 500,
      height: 130,
      borderWidth: 1,
      borderColor: rgb(0.1451, 0.5059, 0.7686),
    });

    page.drawText(`Informações do Funcionário`, {
      x: 60,
      y: 350,
      size: 20,
      color,
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    });
    page.drawText(`Cargo:`, { x: 60, y: 330, size: 16 });
    page.drawText(`${position}`, { x: 113, y: 330, size: 16 });
    page.drawText(`Data de Contratação:`, { x: 60, y: 310, size: 16 });
    page.drawText(`${hireDate}`, { x: 215, y: 310, size: 16 });

    page.drawText(`Departamento:`, { x: 60, y: 290, size: 16 });
    page.drawText(`${department}`, { x: 170, y: 290, size: 16 });

    page.drawText(`Salário:`, { x: 60, y: 270, size: 16 });
    page.drawText(`${salary}`, { x: 120, y: 270, size: 16 });

    const pdfBytes = await pdfDoc.save();
    const pdfUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: 'application/pdf' }),
    );
    setPdfUrl(pdfUrl);
  };

  const handleAddEmployee = async () => {
    console.log(imageAvatar)
    if (formData.name === '' || formData.address === '' || formData.address === '' || formData.sex === '' || formData.phone === '' || formData.birthDayMonth === '' || formData.position === '' || formData.hireDate === '' || formData.department === '' || formData.salary === '' || imageAvatar === null) {
      alert('Preencha todos os campos!');
    } else {
      const updatedEmployees = [...employees, { ...formData }];
      setEmployees(updatedEmployees);
      await addDoc(collection(db, 'funcionarios'), {
        name: formData.name,
        sex: formData.sex,
        address: formData.address,
        phone: formData.phone,
        // profilePicture: formData.profileImage,
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

      await generatePDF(formData);
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
    }
  };

  return (
    <div className="main-container">
      <div className="div-main-form">
        <EmployeeForm
          formData={formData}
          handleInputChange={handleInputChange}
          imageAvatar={imageAvatar}
          fileName={fileName}
          defaultImage={user}
        />
        <Button variant="contained" onClick={handleAddEmployee}>Cadastrar</Button>
      </div>

      <div className="div-main-pdf">
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="600"
            height="800"
            title="PDF Preview"
            style={{ border: 'none' }}
          />
        )}
      </div>
    </div>
  );
}


