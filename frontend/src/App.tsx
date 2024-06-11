import React from "react";
import { Container, Typography, Box } from "@mui/material";
import BookSearchBar from "./components/BookSearchBar";
import SearchResults from "./components/SearchResults.tsx";
import ReadingList from "./components/ReadingList";

const App: React.FC = () => {
  return (
    <Container>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Ello logo"
        src="https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93"
      />
      <Typography variant="h4" gutterBottom style={{ color: "#335C6E" }}>
        Ello Book Assignment
      </Typography>
      <BookSearchBar />
      {/* <SearchResults /> */}
      {/* <ReadingList /> */}
    </Container>
  );
};

export default App;
