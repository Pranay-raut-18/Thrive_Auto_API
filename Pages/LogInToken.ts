// import { request } from '@playwright/test';

// export async function getAuthToken() {
//     const apiContext = await request.newContext();
//     const response = await apiContext.post('https://thrive.thrive-dev.com/api/v1/login', {
//         data: {
//             user: {
//                 username: "qatesting+charly@thrivetrm.com",
//                 password: "Changeme1$"
//             }
//         }
//     });

//     const responseBody = await response.json();
//     console.log(responseBody);
//     const token = responseBody.token;
//     await apiContext.dispose();
//     //console.log(token);
//     return token;
// }
