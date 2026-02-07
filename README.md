# 📘 STUFAN API Documentation

**Base URL**

```
http://localhost:3000
```

**Headers**

```
Content-Type: application/json
```

---

## 📝 POSTS (Blog / Learning Materials)

### Get all published posts

```
GET /posts
```

---

### Get post by ID

```
GET /posts/:id
```

---

### Create post

```
POST /posts
```

**Request Body**

```json
{
  "title": "Post title",
  "content": "Post content",
  "author_id": 1
}
```

---

### Update post

```
PUT /posts/:id
```

**Request Body**

```json
{
  "title": "Updated title",
  "content": "Updated content",
  "published": true
}
```

---

### Delete post

```
DELETE /posts/:id
```

---

## 📅 ATTENDANCE

### Get all attendance records

```
GET /attendance
```

---

### Get attendance by user

```
GET /attendance/user/:user_id
```

---

### Check-in

```
POST /attendance/check-in
```

**Request Body**

```json
{
  "user_id": 1,
  "date": "2026-02-07",
  "check_in": "08:00:00"
}
```

---

### Check-out

```
POST /attendance/check-out
```

**Request Body**

```json
{
  "user_id": 1,
  "date": "2026-02-07",
  "check_out": "16:30:00"
}
```

---

### Update attendance status

```
PUT /attendance/status/:id
```

**Request Body**

```json
{
  "status": "izin"
}
```

Allowed values:

* `hadir`
* `izin`
* `alpha`

---

### Delete attendance record

```
DELETE /attendance/:id
```

---

## 📚 ASSIGNMENTS

### Get all assignments

```
GET /assignments
```

---

### Get assignment by ID

```
GET /assignments/:id
```

---

### Create assignment

```
POST /assignments
```

**Request Body**

```json
{
  "title": "React Assignment",
  "description": "Create a CRUD app",
  "deadline": "2026-02-15 23:59:00"
}
```

---

### Update assignment

```
PUT /assignments/:id
```

**Request Body**

```json
{
  "title": "Advanced React Assignment",
  "description": "Add authentication",
  "deadline": "2026-02-20 23:59:00"
}
```

---

### Delete assignment

```
DELETE /assignments/:id
```

---

## 📤 SUBMISSIONS

### Submit assignment

```
POST /submissions
```

**Request Body**

```json
{
  "assignment_id": 1,
  "user_id": 2,
  "github_url": "https://github.com/user/repository"
}
```

📌 Notes:

* One user can submit **only once per assignment**
* Foreign key error means:

  * user does not exist
  * assignment does not exist

---

## 🔧 DATABASE INITIALIZATION (DEV ONLY)

```
POST /init
```

⚠️ Run **only once** to execute `init.sql`

---

## 🧠 Important Notes

* All endpoints use **JSON**
* Recommended data flow:

  1. users
  2. assignments
  3. attendance / submissions
* Foreign key errors = missing parent data

---
