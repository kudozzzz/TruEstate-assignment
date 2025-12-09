// backend/src/services/salesService.js
import Sale from "../models/Sale.js";

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function getSales(query) {
  const {
    page = 1,
    limit = 20,
    search,
    region,
    gender,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sort,
    sortBy,
    sortOrder,
  } = query;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 20, 1);

  const filter = {};

  // Multi-select filters
  const regions = parseList(region);
  if (regions.length) {
    filter.customerRegion = { $in: regions };
  }

  const genders = parseList(gender);
  if (genders.length) {
    filter.gender = { $in: genders };
  }

  const categories = parseList(productCategory);
  if (categories.length) {
    filter.productCategory = { $in: categories };
  }

  const tagList = parseList(tags);
  if (tagList.length) {
    filter.tags = { $in: tagList };
  }

  const paymentMethods = parseList(paymentMethod);
  if (paymentMethods.length) {
    filter.paymentMethod = { $in: paymentMethods };
  }

  // Date range (HTML date input → yyyy-mm-dd)
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) {
      filter.date.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      // include the whole end day
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      filter.date.$lte = end;
    }
  }

  // Text search (customer, phone, product, employee)
  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { customerName: regex },
      { phoneNumber: regex },
      { productName: regex },
      { employeeName: regex },
      { customerId: regex },
    ];
  }

  // Sorting
  let sortSpec = { date: -1 }; // default: newest first

  // Support both `sort` ("date_desc") and `sortBy` + `sortOrder`
  const sortKey = sort || sortBy;
  const sortDir =
    sortOrder === "asc" || sortKey?.endsWith("_asc") ? 1 : -1;

  if (sortKey) {
    if (sortKey.startsWith("date")) {
      sortSpec = { date: sortDir };
    } else if (sortKey.includes("amount")) {
      sortSpec = { finalAmount: sortDir };
    } else {
      // fallback
      sortSpec = { date: -1 };
    }
  }

  // Run query + metrics in parallel
  const [sales, metrics] = await Promise.all([
    Sale.find(filter)
      .sort(sortSpec)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: "$quantity" },
          totalAmount: { $sum: "$finalAmount" },
          avgOrderAmount: { $avg: "$finalAmount" },
          totalCount: { $sum: 1 },
        },
      },
    ]),
  ]);

  const agg = metrics[0] || {
    totalUnitsSold: 0,
    totalAmount: 0,
    avgOrderAmount: 0,
    totalCount: 0,
  };

  const totalPages =
    agg.totalCount > 0 ? Math.ceil(agg.totalCount / limitNum) : 1;

  return {
    data: sales,
    page: pageNum,
    totalPages,
    totalCount: agg.totalCount,
    metrics: {
      totalUnitsSold: agg.totalUnitsSold,
      totalAmount: agg.totalAmount,
      avgOrderAmount: agg.avgOrderAmount,
    },
  };
}
