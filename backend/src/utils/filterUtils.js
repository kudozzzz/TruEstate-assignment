const toLower = (v) => (typeof v === "string" ? v.toLowerCase() : v);

const parseMultiSelect = (value) =>
  value
    ? value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export const applyFiltersAndSearch = (data, params) => {
  const {
    search,
    phone,
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder
  } = params;

  const searchTerm = search ? search.toLowerCase() : null;
  const phoneTerm = phone ? phone.toLowerCase() : null;

  const regionList = parseMultiSelect(region).map(toLower);
  const genderList = parseMultiSelect(gender).map(toLower);
  const categoryList = parseMultiSelect(category).map(toLower);
  const tagsList = parseMultiSelect(tags).map(toLower);
  const paymentList = parseMultiSelect(paymentMethod).map(toLower);

  const minAge = ageMin ? Number(ageMin) : null;
  const maxAge = ageMax ? Number(ageMax) : null;

  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDateObj = dateTo ? new Date(dateTo) : null;

  let result = data.filter((row) => {
    // Search: Customer Name + Phone
    if (searchTerm) {
      const nameMatch = (row.customerName || "")
        .toLowerCase()
        .includes(searchTerm);
      const phoneMatch = (row.phoneNumber || "")
        .toLowerCase()
        .includes(searchTerm);
      if (!nameMatch && !phoneMatch) return false;
    }

    if (phoneTerm) {
      if (
        !(row.phoneNumber || "")
          .toLowerCase()
          .includes(phoneTerm)
      )
        return false;
    }

    if (regionList.length) {
      const val = (row.customerRegion || "").toLowerCase();
      if (!regionList.includes(val)) return false;
    }

    if (genderList.length) {
      const val = (row.gender || "").toLowerCase();
      if (!genderList.includes(val)) return false;
    }

    if (minAge !== null || maxAge !== null) {
      const age = row.age;
      if (age == null || Number.isNaN(age)) return false;
      if (minAge !== null && age < minAge) return false;
      if (maxAge !== null && age > maxAge) return false;
    }

    if (categoryList.length) {
      const val = (row.productCategory || "").toLowerCase();
      if (!categoryList.includes(val)) return false;
    }

    if (tagsList.length) {
      const tagStr = (row.tags || "").toLowerCase();
      const rowTags = tagStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const hasAll = tagsList.every((t) => rowTags.includes(t));
      if (!hasAll) return false;
    }

    if (paymentList.length) {
      const val = (row.paymentMethod || "").toLowerCase();
      if (!paymentList.includes(val)) return false;
    }

    if (fromDate || toDateObj) {
      const rowDate = new Date(row.date);
      if (Number.isNaN(rowDate.getTime())) return false;
      if (fromDate && rowDate < fromDate) return false;
      if (toDateObj && rowDate > toDateObj) return false;
    }

    return true;
  });

  // Sorting
  let sorted = [...result];
  const order = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "customerName") {
    sorted.sort((a, b) =>
      (a.customerName || "").localeCompare(b.customerName || "") * order
    );
  } else if (sortBy === "quantity") {
    sorted.sort(
      (a, b) => ((a.quantity || 0) - (b.quantity || 0)) * order
    );
  } else if (sortBy === "date") {
    // default: newest first (desc)
    sorted.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);
      return (d2 - d1) * (order || -1);
    });
  } else {
    // default: date desc (newest first)
    sorted.sort((a, b) => {
      const d1 = new Date(a.date);
      const d2 = new Date(b.date);
      return d2 - d1;
    });
  }

  return sorted;
};
