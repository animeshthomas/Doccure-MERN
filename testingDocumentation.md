## API Test Cases

Below is a detailed table of API test cases including descriptions, dates, endpoints, methods, and their test status.
[![Google Sheets](https://img.shields.io/badge/-Documentation-blue?style=for-the-badge&logo=google&logoColor=white)](https://docs.google.com/spreadsheets/d/e/2PACX-1vQFwOWd2L6Bd6nVvdNxaIfKWZDzqi8Tg2yqq0KOScWHrJdPeOxdCpnt2Ou9ffOzIHVmSIJ7_SFgWUVs/pubhtml)

| S.No | Description                | Date       | Endpoint                                                  | Method | Test Status |
|------|----------------------------|------------|-----------------------------------------------------------|--------|-------------|
| 1    | User registration test     | 2024-01-10 | `/api/v1/auth/register`                                   | POST   | ✅          |
| 2    | User login test            | 2024-02-22 | `/api/v1/auth/login`                                      | POST   | ✅          |
| 3    | Email confirmation test    | 2024-02-20 | `/api/v1/auth/confirm-email/:verificationToken`           | POST   | ✅          |
| 4    | Booking session test       | 2024-02-21 | `/api/v1/bookings/checkout-session/:doctorId`             | POST   | ✅          |
| 5    | List doctors test          | 2024-01-02 | `/api/v1/doctors/`                                        | GET    | ✅          |
| 6    | Get doctor by ID test      | 2024-01-19 | `/api/v1/doctors/:id`                                     | GET    | ✅          |
| 7    | Doctor profile test        | 2024-03-05 | `/api/v1/doctors/profile/me`                              | GET    | ✅          |
| 8    | Update doctor test         | 2024-01-28 | `/api/v1/doctors/:id`                                     | PUT    | ✅          |
| 9    | Delete doctor test         | 2024-03-15 | `/api/v1/doctors/:id`                                     | DELETE | ✅          |
| 10   | Search doctors test        | 2024-01-14 | `/api/v1/doctors/searchresult`                            | GET    | ✅          |
| 11   | Unapproved doctors test    | 2024-02-09 | `/api/v1/doctors/unapproved`                              | GET    | ✅          |
| 12   | Approve doctor test        | 2024-02-25 | `/api/v1/doctors/approve/:id`                             | PUT    | ✅          |
| 13   | Reject doctor test         | 2024-03-22 | `/api/v1/doctors/reject/:id`                              | PUT    | ✅          |
| 14   | Insights access test       | 2024-03-01 | `/api/v1/insights/`                                       | GET    | ✅          |
| 15   | Initiate chat test         | 2024-03-12 | `/api/v1/chat/`                                           | POST   | ✅          |
| 16   | Send to doctor test        | 2024-01-31 | `/api/v1/chat/sendToDoctor`                               | POST   | ✅          |
| 17   | Send to user test          | 2024-02-16 | `/api/v1/chat/sendToUser`                                 | POST   | ✅          |
| 18   | Get all patients test      | 2024-01-07 | `/api/v1/chat/getAllPatients/:doctorId/`                  | GET    | ✅          |
| 19   | Provide prescription test  | 2024-03-18 | `/api/v1/prescriptions/provide`                           | POST   | ✅          |
| 20   | Get reviews test           | 2024-02-05 | `/api/v1/reviews/`                                        | GET    | ✅          |
| 21   | Post review test           | 2024-03-26 | `/api/v1/reviews/`                                        | POST   | ✅          |
| 22   | Get doctor reviews test    | 2024-01-26 | `/api/v1/reviews/doctor/:doctorId/reviews`                | GET    | ✅          |
| 23   | List users test            | 2024-02-01 | `/api/v1/users/`                                          | GET    | ✅          |
| 24   | Get user by ID test        | 2024-03-08 | `/api/v1/users/:id`                                       | GET    | ✅          |
| 25   | User profile test          | 2024-03-20 | `/api/v1/users/profile/me`                                | GET    | ✅          |
| 26   | Update user test           | 2024-01-17 | `/api/v1/users/:id`                                       | PUT    | ✅          |
| 27   | Delete user test           | 2024-02-12 | `/api/v1/users/:id`                                       | DELETE | ✅          |
| 28   | My appointments test       | 2024-01-05 | `/api/v1/users/appointments/my-appointments`              | GET    | ✅          |
| 29   | Reset password test        | 2024-03-03 | `/api/v1/users/reset-password`                            | POST   | ✅          |
| 30   | Forgot password test       | 2024-01-23 | `/api/v1/users/forgot-password`                           | POST   | ✅          |
| 31   | Query to doctor test       | 2024-02-19 | `/api/v1/users/send-query-to-doctor`                      | POST   | ✅          |
| 32   | Upgrade to premium test    | 2024-03-29 | `/api/v1/users/upgrade-to-premium`                        | POST   | ✅          |

