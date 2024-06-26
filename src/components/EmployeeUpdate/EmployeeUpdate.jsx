import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../services/firebaseConnection';
import Select from '../materialComponents/Select';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './style.css';
import EmployeeForm from '../Employeeform/EmployeeForm';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import user from '../../assets/images/user.png'
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import logo from '../../assets/images/marca.png';
import FloatingActionButtons from '../materialComponents/FloatingActionButton';


export default function EmployeeUpdate() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
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
    const [fileName, setFileName] = useState('');
    const [changedFields, setChangedFields] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getCollectionData = async () => {
            const collectionRef = collection(db, "funcionarios");
            const querySnapshot = await getDocs(collectionRef);
            const employeesData = [];
            querySnapshot.forEach((doc) => {
                employeesData.push({ id: doc.id, ...doc.data() });
            });
            setEmployees(employeesData);
        };

        getCollectionData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        const originalEmployee = employees.find((employee) => employee.id === selectedEmployee);
        const originalValue = originalEmployee ? originalEmployee[name] : '';

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
            const updatedFields = { ...changedFields };
            if (value !== originalValue) {
                updatedFields[name] = { originalValue, updatedValue: value };
            } else {
                delete updatedFields[name];
            }

            setChangedFields(updatedFields);

            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const handleSearchEmployee = async () => {
        if (!selectedEmployee) {
            console.log("Nenhum funcionário selecionado.");
            return;
        }

        try {
            const docRef = doc(db, "funcionarios", selectedEmployee);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const funcionario = { id: docSnap.id, ...docSnap.data() };
                setFormData(funcionario);
            } else {
                console.log("Funcionário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar funcionário:", error);
        }
    }

    const handleUpdateEmployee = async () => {
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
            if (!selectedEmployee) {
                console.log("Nenhum funcionário selecionado.");
                return;
            }

            try {
                const docRef = doc(db, "funcionarios", selectedEmployee);
                await setDoc(docRef, formData);
                console.log("Funcionário atualizado com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar funcionário:", error);
            }
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <div className="main-container">
            <div className="div-main-form">
                <div className='align-select-employee'>
                    <div className='select-employee-update'>
                        <div>
                            <Select
                                employees={employees}
                                value={selectedEmployee}
                                onChange={handleEmployeeChange}
                                className="select-update"
                            />
                        </div>
                        <Button variant="contained" onClick={handleSearchEmployee}>Bucar funcionário</Button>
                    </div>
                    <EmployeeForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        imageAvatar={imageAvatar}
                        fileName={fileName}
                        defaultImage={user}
                    />
                    <Button variant="contained" onClick={handleUpdateEmployee}>
                        Cadastrar
                    </Button>
                </div>
            </div>
            <div className="div-main-pdf">
                <div>
                    {Object.keys(changedFields).length > 0 && (
                        <label  onClick={() => setOpenModal(!openModal)} >
                            <FloatingActionButtons/>
                        </label>
                    )}
                </div>
                {formData.name && (
                    <PDFGenerator
                        employeeData={formData}
                        fileName={`${formData.name}/${fileName}`}
                        logo={logo}
                        imageAvatar={imageAvatar}
                    />
                )}
            </div>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Dados Alterados</DialogTitle>
                <DialogContent>
                    {Object.entries(changedFields).map(([field, { originalValue, updatedValue }]) => (
                        <div key={field}>
                            <b><p>{`Campo: ${field}`}</p></b>
                            <p>{`Valor Antigo: ${originalValue}`}</p>
                            <p>{`Novo Valor: ${updatedValue}`}</p><br />
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
