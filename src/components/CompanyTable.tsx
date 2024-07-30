import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleSelectAll, toggleSelect, addCompany, removeCompanies, updateCompany, Company } from '../features/companies/companiesSlice';

const CompanyTable: React.FC = () => {
  const companies = useSelector((state: RootState) => state.companies);
  const dispatch = useDispatch();
  const [newCompany, setNewCompany] = useState<Company>({ id: 0, name: '', address: '', selected: false });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleSelectAll(e.target.checked));
  };

  const handleSelect = (id: number) => {
    dispatch(toggleSelect(id));
  };

  const handleAddCompany = () => {
    const id = companies.length > 0 ? Math.max(...companies.map((c: Company) => c.id)) + 1 : 1;
    dispatch(addCompany({ ...newCompany, id }));
    setNewCompany({ id: 0, name: '', address: '', selected: false });
  };

  const handleRemoveCompanies = () => {
    const selectedIds = companies.filter((c : Company)=> c.selected).map((c: Company) => c.id);
    dispatch(removeCompanies(selectedIds));
  };

  const handleUpdateCompany = (company: Company) => {
    dispatch(updateCompany(company));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} /></th>
            <th>Название компании</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: Company) => (
            <tr key={company.id} className={company.selected ? 'selected' : ''}>
              <td><input type="checkbox" checked={company.selected} onChange={() => handleSelect(company.id)} /></td>
              <td><input type="text" value={company.name} onChange={(e) => handleUpdateCompany({ ...company, name: e.target.value })} /></td>
              <td><input type="text" value={company.address} onChange={(e) => handleUpdateCompany({ ...company, address: e.target.value })} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="text" placeholder="Название компании" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} />
        <input type="text" placeholder="Адрес" value={newCompany.address} onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })} />
        <button onClick={handleAddCompany}>Добавить компанию</button>
        <button onClick={handleRemoveCompanies}>Удалить выбранные</button>
      </div>
    </div>
  );
};

export default CompanyTable;