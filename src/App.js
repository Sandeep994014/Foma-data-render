import "./App.css";
import Header from "./components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Card, CardMedia, Typography, Grid } from "@mui/material";
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // const validateForm = () => {
  //   if (!name || !email || !number || !image) {
  //     alert("Please fill in all fields and upload an image.");
  //     return false;
  //   }
  //   // Basic email validation
  //   if (!/\S+@\S+\.\S+/.test(email)) {
  //     alert("Please enter a valid email address.");
  //     return false;
  //   }
  //   return true;
  // };

  const validateForm = () => {
    // Validate Name
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      alert("Please enter a valid name (letters and spaces only).");
      return false;
    }
  
    // Validate Email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    // Validate Number
    if (!number || !/^\d{10}$/.test(number)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
  
    // Check if image is uploaded
    if (!image) {
      alert("Please upload an image.");
      return false;
    }
  
    return true;
  };
  
  const addData = () => {
    if (validateForm()) {
      const newData = [...data, { name, email, number, image }];
      setData(newData);
      localStorage.setItem("userData", JSON.stringify(newData));
      setName("");
      setEmail("");
      setNumber("");
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteData = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem("userData", JSON.stringify(newData)); // Update localStorage
  };

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 2, width: "185px" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Number"
              variant="standard"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Button variant="contained" color="success" onClick={addData}>
              Add More
            </Button>
          </Box>
        </Stack>
      </div>
      <Container maxWidth="0px">
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item margin={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteData(index)}
                  >
                    <PersonRemoveRoundedIcon />
                  </Button>
                </Box>
                <CardMedia
                  component="img"
                  width="100"
                  height="100"
                  alt="Profile"
                  src={item.image}
                  sx={{
                    alignItems: "center",
                    width: { xs: "100%", sm: 100 },
                    height: { xs: "100%", sm: 100 },
                    borderRadius: "50%",
                    padding: 3,
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
                <Typography color="text.primary" fontWeight="semiBold" variant="p">
                  <b>Name :</b> {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="medium"
                >
                  <b>Email :</b> &nbsp; {item.email}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="medium"
                >
                  <b>Mobile :</b> {item.number}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default App;
