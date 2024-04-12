import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebaseConnection';

const PDFGenerator = ({ employeeData, fileName, logo }) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const generatePDF = async () => {
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
        const imageURL = await getDownloadURL(ref(storage, `${fileName}`));
        const imageBytes = await fetch(imageURL).then((res) => res.arrayBuffer());
        const profileImage = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(profileImage, {
          x: 50,
          y: 520,
          width: 130,
          height: 130,
        });
      } catch (error) {
        console.error('Erro ao obter a imagem:', error);
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

    generatePDF();
  }, [employeeData, fileName, logo]);

  return (
    <div>
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
  );
};

export default PDFGenerator;