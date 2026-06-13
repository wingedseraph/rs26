# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Committed at**: 0.9s
- **Render**: 311.7ms
- **Screenshot**: ![screenshot](./screenshots/baseline/sort_countries.avif)

### Interaction B: Search countries

- **Committed at**: 1.3s
- **Render**: 159.8ms
- **Screenshot**: ![screenshot](./screenshots/baseline/search_countries.avif)

### Interaction C: Change year

- **Committed at**: 2.4s
- **Render**: 43.4ms
- **Screenshot**: ![screenshot](./screenshots/baseline/change_year.avif)

### Interaction D: Toggle column

**Open modal:**
- **Committed at**: 0.7s
- **Render**: 47.2ms
- **Screenshot**: ![screenshot](./screenshots/baseline/toggle_column_open_modal.avif)

**Select column:**
- **Committed at**: 2s
- **Render**: 50.6ms
- **Screenshot**: ![screenshot](./screenshots/baseline/toggle_column_select_new_column.avif)

**Close modal:**
- **Committed at**: 3.3s
- **Render**: 35.1ms
- **Screenshot**: ![screenshot](./screenshots/baseline/toggle_column_close_modal.avif)

## Optimized Measurements

### Interaction A: Sort countries

- **Committed at**: 1.3s
- **Render**: 72.7ms
- **Screenshot**: ![screenshot](./screenshots/optimized/sort_countries.avif)

### Interaction B: Search countries

- **Committed at**: 1.3s
- **Render**: 51.7ms
- **Screenshot**: ![screenshot](./screenshots/optimized/search_countries.avif)

### Interaction C: Change year

- **Committed at**: 2.8s
- **Render**: 24.9ms
- **Screenshot**: ![screenshot](./screenshots/optimized/change_year.avif)

### Interaction D: Toggle column

**Open modal:**
- **Committed at**: 1.1s
- **Render**: 14ms
- **Screenshot**: ![screenshot](./screenshots/optimized/toggle_column_open_modal.avif)

**Select column:**
- **Committed at**: 3.1s
- **Render**: 3.9ms
- **Screenshot**: ![screenshot](./screenshots/optimized/toggle_column_select_new_column.avif)

**Close modal:**
- **Committed at**: 3.9s
- **Render**: 1.5ms
- **Screenshot**: ![screenshot](./screenshots/optimized/toggle_column_close_modal.avif)

## Summary of Improvements

| Interaction | Baseline (ms) | Optimized (ms) | Improvement |
|---|---|---|---|
| Sort countries | 311.7 | 72.7 | -76.7% |
| Search countries | 159.8 | 51.7 | -67.6% |
| Change year | 43.4 | 24.9 | -42.6% |
| Toggle column | 44.3 | 6.5 | -85.3% |
| **Average** | **139.8** | **38.9** | **-72.2%** |
