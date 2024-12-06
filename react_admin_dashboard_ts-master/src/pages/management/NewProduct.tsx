import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const NewProduct = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [price, setPrice] = useState<number>();
	const [category, setCategory] = useState<string>("");
	const [stock, setStock] = useState<number>();
	const [brand, setBrand] = useState<string>("");
	const [photo, setPhoto] = useState<string>();

	const [ratings, setRatings] = useState<number>();

	const categories = ["Electronics", "Home Appliances", "Clothing", "Books", "Toys"]; // Categories for dropdown


	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];
		const reader: FileReader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") setPhoto(reader.result);
			};
		}
	};



	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="product-management">
				<article>
					<form>
						<h2>New Product</h2>

						{/* Main Photo */}
						<div>
							<label>
								Main Image
							</label>

							{photo && <img src={photo} alt={name} />}
						</div>
						<div>
						<input required type="file" placeholder="Choose Main Photo" onChange={changeImageHandler} />

						</div>
				
						{/* Product Name */}
						<div>
							<label>Name</label>
							<input
								required
								type="text"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						{/* Description */}
						<div>
							<label>Description</label>
							<textarea
								required
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								style={{
									width: "100%",
									height: "150px",
									padding: "16px"
								}}
							/>
						</div>

						{/* Price */}
						<div>
							<label>Price</label>
							<input
								required
								type="number"
								placeholder="Price"
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
							/>
						</div>

						{/* Category */}
						<div>
							<label>Category</label>
							<select
								className="dropdown"
								required
								value={category}
								onChange={(e) => setCategory(e.target.value)}
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

						{/* Brand */}
						<div>
							<label>Brand</label>
							<input
								required
								type="text"
								placeholder="Brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</div>

						{/* Stock */}
						<div>
							<label>Stock</label>
							<input
								required
								type="number"
								placeholder="Stock"
								value={stock}
								onChange={(e) => setStock(Number(e.target.value))}
							/>
						</div>

						{/* Ratings */}
						<div>
							<label>Ratings (1-5)</label>
							<input
								type="number"
								placeholder="Ratings"
								value={ratings}
								onChange={(e) => setRatings(Number(e.target.value))}
								min={1}
								max={5}
							/>
						</div>

						<button type="submit">Create Product</button>
					</form>
				</article>
			</main>
		</div>
	);
};

export default NewProduct;
