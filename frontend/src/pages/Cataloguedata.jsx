// export const catalogue = [
//   {
//     id: 1,
//     endpoint:"https://service.swiftsuite.app/vendor/all-catalogue/46/",
//     name: 'All',
//   },
//   {
//     id: 2,
//     endpoint:"https://service.swiftsuite.app/vendor/catalogue-rsr/46/",
//     name: 'RSR',
//   },
//   {
//     id: 3,
//     endpoint:"https://service.swiftsuite.app/vendor/catalogue-zanders/46/",
//     name: 'Zanders',
//   },
//   {
//     id: 4,
//     endpoint: "https://service.swiftsuite.app/vendor/catalogue-cwr/46/",
//     name: 'CWR',
//   },
//   {
//     id: 5,
//     endpoint:"https://service.swiftsuite.app/vendor/catalogue-ssi/46/",
//     name: 'SSI',
//   },
//   {
//     id: 6,
//     endpoint: "https://service.swiftsuite.app/vendor/catalogue-lipsey/46/",
//     name: 'Lipsey',
//   },
//   {
//     id: 7,
//     endpoint:"https://service.swiftsuite.app/vendor/catalogue-fragrancex/46/",
//     name: 'FragranceX',
//   },
// ];








const userId = JSON.parse (localStorage.getItem('userId'))
console.log(userId);

export const catalogue = [
  {
    id: 1,
    endpoint:`https://service.swiftsuite.app/vendor/all-catalogue/${userId}/`,
    name: 'All',
  },
  {
    id: 2,
    endpoint:`https://service.swiftsuite.app/vendor/catalogue-rsr/${userId}/`,
    name: 'RSR',
  },
  {
    id: 3,
    endpoint:`https://service.swiftsuite.app/vendor/catalogue-zanders/${userId}/`,
    name: 'Zanders',
  },
  {
    id: 4,
    endpoint: `https://service.swiftsuite.app/vendor/catalogue-cwr/${userId}/`,
    name: 'CWR',
  },
  {
    id: 5,
    endpoint:`https://service.swiftsuite.app/vendor/catalogue-ssi/${userId}/`,
    name: 'SSI',
  },
  {
    id: 6,
    endpoint: `https://service.swiftsuite.app/vendor/catalogue-lipsey/${userId}/`,
    name: 'Lipsey',
  },
  {
    id: 7,
    endpoint:`https://service.swiftsuite.app/vendor/catalogue-fragrancex/${userId}/`,
    name: 'FragranceX',
  },
];
