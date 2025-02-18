import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Pokémon data only once
export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
  const data = await response.json();
  return data.results;
});

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default pokemonSlice.reducer;