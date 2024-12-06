import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Define DataType based on the course schema
interface DataType {
    title: string;
    description: string;
    instructor: string;
    duration: number;
    price: number;
    category: "course" | "product";
    level: "Beginner" | "Intermediate" | "Advanced";
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: "Title",
        accessor: "title",
    },
    {
        Header: "Description",
        accessor: "description",
    },
    {
        Header: "Instructor",
        accessor: "instructor",
    },
    {
        Header: "Duration (hrs)",
        accessor: "duration",
    },
    {
        Header: "Price",
        accessor: "price",
    },
    {
        Header: "Category",
        accessor: "category",
    },
    {
        Header: "Level",
        accessor: "level",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const Courses = () => {
    const [data, setData] = useState<DataType[]>([]);
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:8080/all/courses");
                const fetchedCourses = response.data.map((course: any) => ({
                    title: course.title,
                    description: course.description,
                    instructor: course.instructor,
                    duration: course.duration,
                    price: course.price,
                    category: course.category,
                    level: course.level,
                    action: (
                        <button
                            onClick={() =>
                                navigate(`/admin/course/${course._id}`, {
                                    state: { course: course }, // Passing the course data as state
                                })
                            }
                        >
                            Manage
                        </button>
                    ),
                }));
                setData(fetchedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, [navigate]); // Including navigate as a dependency

    const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Courses", true), [data]);

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="products">{Table()}</main>
            <Link to="/admin/course/new" className="create-product-btn">
                <FaPlus />
            </Link>
        </div>
    );
};

export default Courses;
