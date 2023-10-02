import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Component/Route/MainPage";
import TypePokemons from "./Component/Route/TypePokemons";
import PokemonDetail from "./Component/Route/PokemonDetail";
import { QueryClientProvider, QueryClient } from "react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/type/:id" element={<TypePokemons />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
