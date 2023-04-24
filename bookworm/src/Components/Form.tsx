import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Rating } from "flowbite-react";
const PopupForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    autor: '',
    tytul: '',
    iloscStron: '',
    przeczytaneStrony: '',
    ocenaUzytkownika: '',
    zdjecieLink: '',
    status: 'Czytane',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission logic
    handleClose();
  };

  return (
    <div className="fixed bottom-5 right-5 ">
      <Button variant="contained" onClick={handleOpen} className="">
        Dodaj
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Popup Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Tytuł"
              name="tytul"
              value={formData.tytul}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Ilość stron"
              name="iloscStron"
              value={formData.iloscStron}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Przeczytane strony"
              name="przeczytaneStrony"
              value={formData.przeczytaneStrony}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Ocena użytkownika"
              name="ocenaUzytkownika"
              value={formData.ocenaUzytkownika}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="0">Brak oceny</MenuItem>
              <MenuItem value="1">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
              </MenuItem>
              <MenuItem value="2">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
                </MenuItem>
              <MenuItem value="3">              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment></MenuItem>
              <MenuItem value="4"><React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment></MenuItem>
              <MenuItem value="5">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
                <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
              </MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleStatusChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Czytane">Czytane</MenuItem>
              <MenuItem value="Przeczytane">Przeczytane</MenuItem>
              <MenuItem value="Planowane">Planowane</MenuItem>
              <MenuItem value="Porzucone">Porzucone</MenuItem>
            </TextField>
            <TextField
              label="Zdjęcie link"
              name="zdjecieLink"
              value={formData.zdjecieLink}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleClose}>Anuluj</Button>
              <Button type="submit" variant="contained" color="primary">
                Dodaj
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default PopupForm;