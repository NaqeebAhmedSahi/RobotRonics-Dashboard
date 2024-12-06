
const Course = require("../models/courseModel");
const User = require("../models/User"); // Assuming your user model is named userModel

// Create a new course (Instructor only)
const createCourse = async (req, res) => {
  try {
    // Ensure the user is an instructor
    if (!req.user || !req.user.isInstructor) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only instructors can create courses.',
      });
    }

    // Extract and validate required fields from the request body
    const { title, description, duration, price, category, level } = req.body;

    // Check for missing required fields
    if (!title || !description || !duration || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    // Check if a course with the same title already exists
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'A course with this title already exists.',
      });
    }

    // Add course image path to the course object if provided
    const image = req.file ? req.file.path : null;

    // Create a new course with the uploaded image (if available)
    const course = new Course({
      title,
      description,
      duration,
      price,
      category,
      level,
      instructor: req.user._id, // Assign the logged-in user as the instructor
      image, // Image path from multer
    });

    // Save the course to the database
    await course.save();

    // Respond with success message and the created course data
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating course:', error);
    // Respond with a server error message
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error.message}`,
    });
  }
};

// Get all courses with filters
// const getAllCourses = async (req, res) => {
//   try {
//     const { category, level, minPrice, maxPrice, minDuration, maxDuration } = req.query;

//     // Create a filter object
//     let filter = {};

//     // Add category filter if provided
//     if (category) {
//       filter.category = category;
//     }

//     // Add level filter if provided
//     if (level) {
//       filter.level = level;
//     }

//     // Add price range filter if provided
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) {
//         filter.price.$gte = minPrice; // Price greater than or equal to minPrice
//       }
//       if (maxPrice) {
//         filter.price.$lte = maxPrice; // Price less than or equal to maxPrice
//       }
//     }

//     // Add duration range filter if provided
//     if (minDuration || maxDuration) {
//       filter.duration = {};
//       if (minDuration) {
//         filter.duration.$gte = minDuration; // Duration greater than or equal to minDuration
//       }
//       if (maxDuration) {
//         filter.duration.$lte = maxDuration; // Duration less than or equal to maxDuration
//       }
//     }

//     // Fetch courses based on the filters
//     const courses = await Course.find(filter).populate("instructor", "username email");

//     // Respond with the filtered courses
//     res.status(200).json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).json({
//       success: false,
//       message: `Server Error. Please try again later. ${error}`,
//     });
//   }
// };
const getAllCourses = async (req, res) => {
  try {
    const { category, level, minPrice, maxPrice, minDuration, maxDuration } = req.query;

    // Create a filter object
    let filter = {};

    // Add category filter if provided
    if (category) {
      filter.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Add level filter if provided
    if (level) {
      filter.level = level;
    }

    // Add price range filter if provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = minPrice; // Price greater than or equal to minPrice
      }
      if (maxPrice) {
        filter.price.$lte = maxPrice; // Price less than or equal to maxPrice
      }
    }

    // Add duration range filter if provided
    if (minDuration || maxDuration) {
      filter.duration = {};
      if (minDuration) {
        filter.duration.$gte = minDuration; // Duration greater than or equal to minDuration
      }
      if (maxDuration) {
        filter.duration.$lte = maxDuration; // Duration less than or equal to maxDuration
      }
    }

    // Fetch courses based on the filters
    const courses = await Course.find(filter).populate("instructor", "username email");

    // Respond with the filtered courses
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Get details of a specific course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find course by ID and populate instructor details
    const course = await Course.findById(id).populate(
      "instructor",
      "username email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Update a course by ID (Instructor only)
const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the user is the instructor of the course or an admin
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (
      course.instructor.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        success: false,
        message: `Access denied. You can only update your own courses.${res}`,
      });
    }

    // Update course with the provided fields
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updated data is validated
    });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Get courses by category
const getCoursesByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    // Find courses with the specified category
    const courses = await Course.find({ category });

    // If no courses are found, respond with a message
    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No courses found in the category: ${category}`,
      });
    }

    // Respond with the list of courses
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Delete a course by ID (Instructor only)
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the logged-in user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own courses.",
      });
    }

    // Delete the course using the deleteOne method
    await Course.deleteOne({ _id: courseId });

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Get enrolled students in a specific course (Instructor only)
const getEnrolledStudents = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by ID and populate the 'students' field
    const course = await Course.findById(courseId).populate(
      "students",
      "username email"
    );

    // Check if the course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the logged-in user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only the course instructor can view enrolled students.",
      });
    }

    // Return the list of students
    res.status(200).json({
      success: true,
      students: course.students,
    });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Enroll the authenticated user in a course
const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the user is already enrolled
    if (course.students.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Add the user to the list of students
    course.students.push(userId);

    // Save the updated course
    await course.save();

    // Optionally, add the course to the user's enrolled courses list
    const user = await User.findById(userId);
    user.enrolledCourses = user.enrolledCourses || [];
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully enrolled in the course",
      data: course,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error.message}`,
    });
  }
};

// Get a list of courses the authenticated user is enrolled in
const getEnrolledCourses = async (req, res) => {
  try {
    // Find courses where the user is enrolled
    const courses = await Course.find({ students: req.user._id });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in any courses.",
      });
    }

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Unenroll the authenticated user from a course
const unenrollFromCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the user is enrolled in the course
    const isEnrolled = course.students.includes(userId);
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Unenroll the user from the course
    course.students = course.students.filter(
      (student) => student.toString() !== userId.toString()
    );
    await course.save();

    res.status(200).json({
      success: true,
      message: "You have been unenrolled from the course",
    });
  } catch (error) {
    console.error("Error unenrolling from course:", error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

// Get a list of students enrolled in a specific course
const getStudentsInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by ID and populate the students field
    const course = await Course.findById(courseId).populate('students', 'username email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Ensure the requesting user is the instructor of the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only the instructor of this course can view enrolled students.',
      });
    }

    // Respond with the list of students
    res.status(200).json({
      success: true,
      data: course.students,
    });
  } catch (error) {
    console.error('Error getting students in course:', error);
    res.status(500).json({
      success: false,
      message: `Server Error. Please try again later. ${error}`,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  getCoursesByCategory,
  deleteCourse,
  getEnrolledStudents,
  enrollInCourse,
  getEnrolledCourses,
  unenrollFromCourse,
  getStudentsInCourse,
};