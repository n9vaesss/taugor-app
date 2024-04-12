import React from 'react';
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdOutlineFileUpload } from 'react-icons/md';
import InputMask from 'react-input-mask';
import './style.css';

export default function EmployeeForm({ formData, handleInputChange, imageAvatar, fileName, defaultImage }) {
  return (
    <Stack spacing={1} direction="column" className='div-align-form'>
      <h2 style={{ textAlign: "center" }}>Cadastrar Funcionário</h2>
      <div className='align-img-inputs'>
        <div>
          <TextField
            id="filled-basic"
            variant="outlined"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            style={{ padding: '10px 10px 10px 0px' }}
          />
          <FormControl style={{ padding: '10px 10px 10px 0px' }} >
            <InputLabel htmlFor="sex" style={{ top: '10px', marginLeft: "0px" }} >Sexo</InputLabel>
            <Select
              label="Sexo"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
            >
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
        </div>
        <label htmlFor="profilePicture" className='icon-file'>
          <img src={imageAvatar || defaultImage} alt=""/>
          <MdOutlineFileUpload className='icons-upload' />
          <input type="file" id="profilePicture" name="profilePicture" style={{ display: 'none' }} onChange={handleInputChange} />
        </label>
      </div>
      <TextField
        id="filled-basic"
        variant="outlined"
        type="text"
        name="address"
        placeholder="Endereço"
        value={formData.address}
        onChange={handleInputChange}
      />
      <InputMask
        mask="(99) 99999-9999"
        maskChar=""
        value={formData.phone}
        onChange={handleInputChange}
      >
        {() => (
          <TextField
            type="text"
            name="phone"
            placeholder="Telefone"
            fullWidth
          />
        )}
      </InputMask>
      <div>
        <label htmlFor="birthDayMonth">Data de aniversário</label>
        <InputMask
          mask="99/99"
          maskChar=""
          type="text"
          name="birthDayMonth"
          placeholder="DD/MM"
          value={formData.birthDayMonth}
          onChange={handleInputChange}
        >
          {() => (
            <TextField
              type="text"
              name="birthDayMonth"
              placeholder="DD/MM"
              fullWidth
            />
          )}
        </InputMask>
      </div>
      <TextField
        id="filled-basic"
        variant="outlined"
        type="text"
        name="position"
        placeholder="Cargo"
        value={formData.position}
        onChange={handleInputChange}
      />
      <div>
        <label htmlFor="hireDate">Data de Contratação: </label>
        <input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleInputChange}
        />
      </div>
      <TextField
        id="filled-basic"
        variant="outlined"
        type="text"
        name="department"
        placeholder="Departamento"
        value={formData.department}
        onChange={handleInputChange}
      />
      <TextField
        id="filled-basic"
        variant="outlined"
        type="text"
        name="salary"
        placeholder="Salário"
        value={formData.salary}
        onChange={handleInputChange}
      />
    </Stack>
  );
}
