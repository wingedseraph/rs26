import { memo } from "react";

import styles from './sort-container.module.css';

type SortContainerProps = {
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortFieldChange: (field: 'name' | 'population') => void
  onSortOrderToggle: () => void
}

export const SortContainer = memo(({ sortField, sortOrder, onSortFieldChange, onSortOrderToggle }: SortContainerProps) => {
  return (<div className={styles.sortContainer}>
    <label className={styles.sortLabel}>Sort by:</label>
    <select
      value={sortField}
      onChange={(e) => onSortFieldChange(e.target.value as 'name' | 'population')}
      className={styles.sortSelect}
    >
      <option value="population">Population</option>
      <option value="name">Name</option>
    </select>

    <button onClick={onSortOrderToggle} className={styles.sortButton}>
      {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
    </button>
  </div>)
})
