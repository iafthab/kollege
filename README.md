# KOLLEGE

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[kollege.onrender.com](https://kollege.onrender.com)

A College Based Data Management System.

- There are two types of roles: Staff[Teacher,HOD] and Student.

## Login Details

PS: BE KIND :)

### Teacher [staff]

**username:** Delphine  
**pwd:** Delphine123

Teacher can add or edit

- Notes
- Attendance
- Internal Marks
- Time Schedule

### HOD (Head of Department) [staff]

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

**Client:** React, TailwindCSS

**Server:** NodeJS, ExpressJS

**Database:** MongoDB, Mongoose

## Other Features

- Profile
- Dark Theme
- Mobile Responsive

## Setting Up

Clone the project:

```bash
  git clone https://github.com/iafthab/kollege.git
```

Change Directory:

```bash
  cd kollege
```

Install dependencies:

```bash
  npm install
```

Finally,

```bash
  npm start
```

### Using your own server and database

The requests are send to the hosted server by default.  
if you want to use your own server and database, follow the steps [here](https://github.com/iafthab/kollege_api#readme) to step up one.

Then, go to src/config/api/axios.js. change the baseURL to your backend address:

```javascript
baseURL: "http://localhost:3500";
```

```javascript
baseURL: "https://example.address.com";
```

## RoadMap

- Add admin 😴
- Cache Queries
- Paginate Queries

## Contact

Errors are bound to happen and the documentation is incomplete.  
I'd love to hear feedbacks and suggestions.  
In any case, start a conversation: [LinkedIn](https://www.linkedin.com/in/iafthab) [Telegram](https://tttttt.me/LazySage01) [Mail](mailto:afthabiqbal123@gmail.com)(Make sure your mail doesn't get flagged as spam/junk)  
Thank You ❤️.

## Acknowledgements

- [MERN Stack Tutorial](https://www.youtube.com/watch?v=CvCiNeLnZ00&pp=ygUOZGF2ZSBncmF5IGZ1bGw%3D) by [Dave Gray](https://github.com/gitdagray)
- [React Tutorial](https://www.youtube.com/watch?v=RVFAyFWO4go&pp=ygUOZGF2ZSBncmF5IGZ1bGw%3D) by [Dave Gray](https://github.com/gitdagray)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [React Router](https://reactrouter.com/en/main)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [axios](https://axios-http.com/)
- [README Editor](readme.so)

## Related

[kollege_api](https://github.com/iafthab/kollege_api)

## License

[MIT](https://choosealicense.com/licenses/mit/)
