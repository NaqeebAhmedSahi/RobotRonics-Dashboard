import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const img =
	"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2hvZXN8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagemnet = () => {
	const [name, setName] = useState<string>("Puma Shoes");
	const [price, setPrice] = useState<number>(1399);
	const [stock, setStock] = useState<number>(12);
	const [photo, setPhoto] = useState<string>(img);
	const [brand, setBrand] = useState<string>("Puma");
	const [description, setDescription] = useState<string>("High-quality Puma shoes for sports and casual wear.");
	const [category, setCategory] = useState<string>("Footwear");

	const [nameUpdate, setNameUpdate] = useState<string>("Puma Shoes");
	const [priceUpdate, setPriceUpdate] = useState<number>(1399);
	const [stockUpdate, setStockUpdate] = useState<number>(12);
	const [photoUpdate, setPhotoUpdate] = useState<string>(img);
	const [brandUpdate, setBrandUpdate] = useState<string>("Puma");
	const [descriptionUpdate, setDescriptionUpdate] = useState<string>("High-quality Puma shoes for sports and casual wear.");
	const [categoryUpdate, setCategoryUpdate] = useState<string>("Footwear");

	const categories = ["Electronics", "Home Appliances", "Clothing", "Books", "Toys"]; // Categories for dropdown

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];
		const reader: FileReader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") setPhotoUpdate(reader.result);
			};
		}
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setName(nameUpdate);
		setPrice(priceUpdate);
		setStock(stockUpdate);
		setPhoto(photoUpdate);
		setBrand(brandUpdate);
		setDescription(descriptionUpdate);
		setCategory(categoryUpdate);
	};

	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="product-management">
				<section>
					<strong>ID - Prdouct-101</strong>
					<img src={photo} alt={name} />
					<p>{name}</p>
					{stock > 0 ? <span className="green">{stock} Available</span> : <span className="red">Not Available</span>}
					<h3>${price}</h3>
					<p><strong>Description:</strong> {description}</p>
					<p><strong>Brand:</strong> {brand}</p>
					<p><strong>Category:</strong> {category}</p>
					<p><strong>Stock:</strong> {stock} units</p>
				</section>
				<article>
					<form onSubmit={submitHandler}>
						<h2>Manage Product</h2>
						{photoUpdate && <img src={photoUpdate} alt={nameUpdate} />}
						<div>
							<label style={{ backgroundColor: "transparent", top: "-1.5rem" }}>Choose Photo</label>
							<input required type="file" placeholder="Choose Photo" onChange={changeImageHandler} />
						</div>
						<div>
							<label>Name</label>
							<input required type="text" placeholder="Name" value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value)} />
						</div>
						<div>
							<label>Description</label>
							<textarea
								required
								value={descriptionUpdate}
								onChange={(e) => setDescriptionUpdate(e.target.value)}
								style={{
									width: "100%",
									height: "150px",
									padding: "16px"
								}}
							/>
						</div>
						<div>
							<label>Price</label>
							<input
								required
								type="number"
								placeholder="Price"
								value={priceUpdate}
								onChange={(e) => setPriceUpdate(Number(e.target.value))}
							/>
						</div>
						<div>
							<label>Stock</label>
							<input
								required
								type="number"
								placeholder="Stock"
								value={stockUpdate}
								onChange={(e) => setStockUpdate(Number(e.target.value))}
							/>

						</div>
						<div>
							<label>Category</label>
							<select
								className="dropdown"
								required
								value={categoryUpdate}
								onChange={(e) => setCategoryUpdate(e.target.value)}
								style={{
									width: "100%",
									height:"49px",
									padding:"16px"
								}} // Handle category update
							>
								{categories.map((category, index) => (
									<option key={index} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div>
							<label>Brand</label>
							<input
								required
								type="text"
								value={brandUpdate}
								onChange={(e) => setBrandUpdate(e.target.value)}
							/>
						</div>
						<button type="submit">Update Product</button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default ProductManagemnet;
