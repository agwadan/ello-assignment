import React from "react";
import { Container, Typography, Box, styled } from "@mui/material";
import BookSearchBar from "./components/BookSearchBar";

const AppContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
});

const App: React.FC = () => {
  return (
    <AppContainer>
      <Box
        component="img"
        alt="Ello logo"
        sx={{ maxHeight: "5rem" }}
        src="https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93"
      />
      <Typography variant="h4" gutterBottom style={{ color: "#335C6E" }}>
        Assign A Book
      </Typography>
      <BookSearchBar />
    </AppContainer>
  );
};

export default App;
