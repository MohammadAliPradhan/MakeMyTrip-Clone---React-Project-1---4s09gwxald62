import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export default function ButtonUsage() {
  const navigate = useNavigate()

  return <Button variant="contained" onClick={(()=>navigate("/login"))}>Login</Button>;
}