import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type FilterState = {
  selectedTab: string;
  searchQuery: string;
  selectedToken?: string;
  sortBy: {
    key : string;
    direction: 'asc' | 'desc';
  };
};

const initialState: FilterState = {
    selectedTab: 'All',
    searchQuery: '',
    sortBy: {
      key: 'name',
      direction: 'asc',
    },
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<FilterState["selectedTab"]>) => {
      state.selectedTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<FilterState["searchQuery"]>) => {
      state.searchQuery = action.payload;
    },
    setSelectedToken: (state, action: PayloadAction<FilterState["selectedToken"]>) => {
      state.selectedToken = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setTab,setSearchQuery,setSelectedToken,setSortBy } = tokensSlice.actions;

export default tokensSlice.reducer;