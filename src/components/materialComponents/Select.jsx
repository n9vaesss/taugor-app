import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ employees, value, onChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="employee-select-label">Funcionário</InputLabel>
        <Select
          labelId="employee-select-label"
          id="employee-select"
          value={value}
          label="Funcionário"
          onChange={onChange}
        >
          {employees.map((employee) => (
            <MenuItem key={employee.id} value={employee.id}>
              {employee.name} - {employee.position} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
