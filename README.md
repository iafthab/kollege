# KOLLEGE

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[kollege.onrender.com](https://kollege.onrender.com)

A College Based Data Management System.

- There are three roles: Teacher, HOD and Student.

## Login Details

PS: BE KIND :)

### Teacher

**username:** Delphine  
**pwd:** Delphine123

Teacher can add or edit

- Notes
- Attendance
- Internal Marks
- Time Schedule

### HOD

**username:** Moriah  
**pwd:** Moriah123

HOD can do everything Teacher can.  
HOD can also

- Approve new Teacher
- Add New Paper

### Student

**username:** Bret  
**pwd:** Bret

Or register a new Student and Login.  
You can also login with the First Name of any student in the class.

Student can view

- Notes
- Attendance
- Internal Marks

Attendance and Marks needs to be added by the teacher first.  
Student can also join or leave a Paper(Subject).

## Tech Stack

**Front-End:** <img src="https://cdn.svgporn.com/logos/react.svg" height="12" width="12"> React, <img src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" height="12" width="12"> TailwindCSS

**Server:** <img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" height="12" width="12"> NodeJS, ExpressJS

**Database:** <img src="https://cdn.svgporn.com/logos/mongodb-icon.svg" height="12" width="12">MongoDB, Mongoose

## Other Features

- Profile
- Dark Theme
- Mobile Responsive

## Run Locally

Clone the project - Kollege:

```bash
  git clone https://github.com/iafthab/5.6-Kollege
```

Clone the backend - Kollege API:

```bash
  git clone https://github.com/iafthab/4.4-Kollege_API
```

Open Kollege API project, create a .env file and paste your database URI:

```javascript
  DATABASE_URI = mongodb+srv:/...
```

Install dependencies on both projects:

```bash
  npm install
```

Start the server in Kollege API:

```bash
  npm run start
```

On the Kollege project, go to src/config/api/axios.js. change the baseURL:

```javascript
baseURL: "http://localhost:3500";
```

or

```javascript
baseURL: "https://example.address.com";
```

Finally,

```bash
  npm start
```

### Still getting errors?

In the Kollege API project, go to config/allowedOptions.js. Make sure your front-end address is included:

```javascript
const allowedOrigins = ["http://localhost:3000", "https://example.address.com"];
```

## RoadMap

- Add admin 😴
- Cache Queries

## Acknowledgements

- [MERN Stack Tutorial](https://www.youtube.com/watch?v=CvCiNeLnZ00&pp=ygUOZGF2ZSBncmF5IGZ1bGw%3D) by [Dave Gray](https://github.com/gitdagray)
- [React Tutorial](https://www.youtube.com/watch?v=RVFAyFWO4go&pp=ygUOZGF2ZSBncmF5IGZ1bGw%3D) by [Dave Gray](https://github.com/gitdagray)
- Official Documentation ([React](https://react.dev/), [TailwindCSS](https://tailwindcss.com/), [MongoDB](https://www.mongodb.com/docs/))
- [React Icons](https://react-icons.github.io/react-icons/search)
- [React Router](https://reactrouter.com/en/main)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Axios](https://axios-http.com/)
- [README Editor](readme.so)

## Related

[KOLLEGE API](https://github.com/afthab-i/4.4-Kollege_API)

## Feedback

If you have any feedback, please reach out to me at [here](mailto:afthabiqbal123@gmail.com). Thank You ❤️.

## License

[MIT](https://choosealicense.com/licenses/mit/)
