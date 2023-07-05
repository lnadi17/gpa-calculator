# GPA Calculator

This project is a highly customizable GPA Calculator for Freeuni and Agruni students. It allows users to add/change/remove subjects and see how it impacts their GPA, export the results, or import the data from the EMIS website itself.

Demo website is available at: [https://lnadi17.github.io/gpa-calculator/](https://lnadi17.github.io/gpa-calculator/)

![Demo GIF](./demo.gif)

## Features

These are the key features of the website:
- Easy import of student grades from the EMIS website through simple copy-pasting using the "Infinity" button
- Convenient export of all data into an Excel file using the "Download" button
- Flexibility to add, modify, or remove subject names, credits, and grades, with instant GPA updates
- Quick search functionality to locate existing subjects by name, automatically importing them with pre-filled credits
- Ability to switch between Freeuni and Agruni to change the search results

## Contribution

This website is React-only, it has no backend. Setting up development environment is therefore very easy.
1. Clone the repository
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.

In the `data` folder there exists Postman Collection that was used to get the University subjects. However, only the second-semester subjects were retrieved. They reside in `EmisData.js` file and contributions to this file are very welome. Data is in a very simple format:
```js
export const freeuniData = {
    'ბიოლოგია': 6,
    'ბიზნესი მოქმედებაში I': 2,
    'ლიდერობა და მოტივირება': 1,
    ...
}
```

## Disclaimer
This project is not affiliated with Free University or Agrarian University. Understand that the GPA calculated from this website is not official in any way and may not be accurate. It is a completely independent project, intended for educational purposes only. Use this website at your own risk.

## Learn More
This is one of the few projects I've created for students. I've worked on [exam-schedules](https://github.com/freeunicodes/exam-schedules), [exam-schedules-front](https://github.com/freeunicodes/exam-schedules-front) and [emis-alert](https://github.com/lnadi17/emis-alert). Feel free to explore those repositories too.

