import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  id: number;
  name: string;
  address: string;
  selected: boolean;
}

const initialState: Company[] = [
  { id: 1, name: 'Компания А', address: 'Адрес А', selected: false },
  { id: 2, name: 'Компания Б', address: 'Адрес Б', selected: false },
  // Можно добавить другие компании
];

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      return state.map((company: Company) => ({ ...company, selected: action.payload }));
    },
    toggleSelect: (state, action: PayloadAction<number>) => {
      return state.map((company: Company) =>
        company.id === action.payload ? { ...company, selected: !company.selected } : company
      );
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.push(action.payload);
    },
    removeCompanies: (state, action: PayloadAction<number[]>) => {
      return state.filter((company: Company) => !action.payload.includes(company.id));
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      return state.map((company: Company) =>
        company.id === action.payload.id ? action.payload : company
      );
    },
  },
});

export const { toggleSelectAll, toggleSelect, addCompany, removeCompanies, updateCompany } = companiesSlice.actions;
export default companiesSlice.reducer;