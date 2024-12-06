import {  useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
	photo: React.ReactElement;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: string;
	brand: string;
	averageRating: number;
	numOfReviews: number;
	createdAt: string;
	action: React.ReactElement;
  }

  
  const columns: Column<DataType>[] = [
	{
	  Header: "Photo",
	  accessor: "photo",
	},
	{
	  Header: "Name",
	  accessor: "name",
	  
	},
	{
	  Header: "Description", // Column header
	  accessor: "description", 
	  width: 2000,
	},
	{
	  Header: "Price",
	  accessor: "price",
	},
	{
	  Header: "Stock",
	  accessor: "stock",
	},
	{
	  Header: "Category", // New column for category
	  accessor: "category",
	},
	{
	  Header: "Brand", // New column for brand
	  accessor: "brand",
	},
	{
	  Header: "Rating", // New column for average rating
	  accessor: "averageRating",
	},
	{
	  Header: "Reviews", // New column for number of reviews
	  accessor: "numOfReviews",
	},
	{
	  Header: "Created At", // New column for the created date
	  accessor: "createdAt",
	},
	{
	  Header: "Action",
	  accessor: "action",
	},
  ];
  

const img = "https://m.media-amazon.com/images/I/71Un+LxdqYL._AC_UL480_FMwebp_QL65_.jpg";
const img1 = "https://m.media-amazon.com/images/I/91ExqbocT9L._SL1500_.jpg";

const arr: DataType[] = [
    {
        photo: <img src={img} alt="Shoes" />,
        name: "Puma Shoes Air Jordan 2023",
        description: "High-quality Puma Air Jordan shoes, perfect for sports and casual wear.",
        price: 690,
        stock: 3,
		category: "Electronics",
		brand: "Brand A",
		averageRating: 4.5,
		numOfReviews: 100,
		createdAt: "2024-01-01",
        action: <Link to="/admin/product/sajknaskd">Manage</Link>,
    },
    {
        photo: <img src={img1} alt="Extension Board" />,
        name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
        description: "Powerful and compact extension board with multiple USB ports, ideal for home and office use.",
        price: 7999,
        stock: 33,
		category: "Home Appliances",
      brand: "Brand B",
      averageRating: 3.8,
      numOfReviews: 50,
      createdAt: "2024-02-15",
        action: <Link to="/admin/product/sajknaskd">Manage</Link>,
    },
    {
        photo: <img src={img} alt="Shoes" />,
        name: "Puma Shoes Air Jordan 2023",
        description: "Stylish and comfortable shoes for all-day wear.",
        price: 690,
        stock: 3,
		category: "Home Appliances",
      brand: "Brand B",
      averageRating: 3.8,
      numOfReviews: 50,
      createdAt: "2024-02-15",
        action: <Link to="/admin/product/sajknaskd">Manage</Link>,
    },
];
// const arr: DataType[] = [
// 	{
// 		photo: <img src={img} alt="Shoes" />,
// 		name: "Puma Shoes Air jordan Cook Nigga 2023",
// 		description:"HJKSw dksajs",
// 		price: 690,
// 		stock: 3,
// 		action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	},
// 	{
// 		photo: <img src={img1} alt="Shoes" />,
// 		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 		description:"HJKSw dksajs",
// 		price: 7999,
// 		stock: 33,
// 		action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	},
// 	{
		
// 		photo: <img src={img} alt="Shoes" />,
// 		name: "Puma Shoes Air jordan Cook Nigga 2023",
// 		description:"HJKSw dksajs",
// 		price: 690,
// 		stock: 3,
// 		action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	},
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img} alt="Shoes" />,
// 	// 	name: "Puma Shoes Air jordan Cook Nigga 2023",
// 	// 	price: 690,
// 	// 	stock: 3,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// 	// {
// 	// 	photo: <img src={img1} alt="Shoes" />,
// 	// 	name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
// 	// 	price: 7999,
// 	// 	stock: 33,
// 	// 	action: <Link to="/admin/product/sajknaskd">Manage</Link>,
// 	// },
// ];

const Products = () => {
	const [data] = useState(arr);
	console.log(data); // Log the data passed to the table

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Products", true), []);

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="products">{Table()}</main>
			<Link to="/admin/product/new" className="create-product-btn">
				<FaPlus />
			</Link>
		</div>
	);
};

export default Products;
