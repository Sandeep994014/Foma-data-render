import "./App.css";
import Header from "./components/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Card, CardMedia, Typography, Grid } from "@mui/material";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const addData = () => {
    if (name && email && number && image) {
      const newData = [...data, { name, email, number, image }];
      setData(newData);
      localStorage.setItem("userData", JSON.stringify(newData)); // Save to localStorage

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
        setImage(reader.result); // Set the image to base64 string
      };
      reader.readAsDataURL(file);
    }
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  // overflow-x: auto,
                }}
              >
                <CardMedia
                  component="img"
                  width="100"
                  height="100"
                  alt="Profile"
                  src={item.image} // Placeholder image, replace with actual image if needed
                  sx={{
                    width: { xs: '100%', sm: 100 },
                    height: { xs: '100%', sm: 100 },
                    borderRadius: '50%', 
                  }}
                />
                <Typography color="text.primary" fontWeight="semiBold" variant="p">
                  Name: {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="medium"
                >
                  Email: {item.email}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="medium"
                >
                 Mobile:  {item.number}
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
