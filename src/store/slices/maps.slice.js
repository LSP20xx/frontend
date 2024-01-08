import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/errors";
import { getMaps, getMap, insertMap  } from "../../db";

import { URL_GEOCODING } from "../../utils/maps";

const initialState = {
    maps: null,
    map: null,
    isLoading: false,
};

export const fetchLocationOnMap = createAsyncThunk("maps/fetchLocationOnMap", async (address, thunkAPI) => {
    try {
        const response = await fetch(URL_GEOCODING(encodeURIComponent(address)));
        if (!response.ok) {
            return thunkAPI.rejectWithValue(extractErrorMessage(response));
        }
        const data = await response.json();
       if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        } else {
            return thunkAPI.rejectWithValue(data.error_message);
       }
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const fetchMapsFromDatabase = createAsyncThunk("maps/fetchMapsFromDatabase", async (_, thunkAPI) => {
    try {
        const maps = await getMaps();
        return maps;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const fetchMapFromDatabase = createAsyncThunk("maps/fetchMapFromDatabase", async (id, thunkAPI) => {
    try {
        const map = await getMap(id);
        return map;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addMap = createAsyncThunk("maps/addMap", async (map, thunkAPI) => {
    try {
        const newMap = await insertMap(map);
        return newMap;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const mapsSlice = createSlice({
    name: "maps",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLocationOnMap.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLocationOnMap.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maps = action.payload;
        });
        builder.addCase(fetchLocationOnMap.rejected, (state, action) => {
            state.isLoading = false;
            state.maps = null;
        });
        builder.addCase(fetchMapFromDatabase.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(fetchMapFromDatabase.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maps = action.payload;
        }
        );
        builder.addCase(fetchMapFromDatabase.rejected, (state, action) => {
            state.isLoading = false;
            state.maps = null;
        }
        );
        builder.addCase(addMap.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(addMap.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maps = action.payload;
        }
        );
        builder.addCase(addMap.rejected, (state, action) => {
            state.isLoading = false;
            state.maps = null;
        }
        );
        builder.addCase(fetchMapsFromDatabase.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(fetchMapsFromDatabase.fulfilled, (state, action) => {
            state.isLoading = false;
            state.maps = action.payload;
        }
        );
        builder.addCase(fetchMapsFromDatabase.rejected, (state, action) => {
            state.isLoading = false;
            state.maps = null;
        }
        );

    }
});

export default mapsSlice.reducer;

