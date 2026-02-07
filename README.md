# 📘 STUFAN API DOCUMENTATION

Base URL

```
http://localhost:3000
```

Content-Type (wajib untuk POST / PUT):

```
application/json
```

---

## 👤 USERS

### ➤ Get all users

**GET**

```
/users
```

**Response**

```json
[
  {
    "id": 1,
    "name": "John",
    "email": "john@mail.com",
    "role": "student",
    "created_at": "2026-02-07"
  }
]
```

---

### ➤ Create user

**POST**

```
/users
```

**Body**

```json
{
  "name": "John",
  "email": "john@mail.com",
  "password": "123456",
  "role": "student"
}
```

---

### ➤ Update user

**PUT**

```
/users/:id
```

**Body**

```json
{
  "name": "John Updated",
  "email": "john@mail.com",
  "role": "admin"
}
```

---

### ➤ Delete user

**DELETE**

```
/users/:id
```

---

## 📝 POSTS

### ➤ Get published posts

**GET**

```
/posts
```

---

### ➤ Get post by ID

**GET**

```
/posts/:id
```

---

### ➤ Create post

**POST**

```
/posts
```

**Body**

```json
{
  "title": "Hello World",
  "content": "Post content",
  "author_id": 1
}
```

---

### ➤ Update post

**PUT**

```
/posts/:id
```

**Body**

```json
{
  "title": "Updated title",
  "content": "Updated content",
  "published": true
}
```

---

### ➤ Delete post

**DELETE**

```
/posts/:id
```

---

## 📚 ASSIGNMENTS

### ➤ Get all assignments

**GET**

```
/assignments
```

---

### ➤ Get assignment by ID

**GET**

```
/assignments/:id
```

---

### ➤ Create assignment

**POST**

```
/assignments
```

**Body**

```json
{
  "title": "Final Project",
  "description": "Build REST API",
  "deadline": "2026-03-01"
}
```

---

### ➤ Update assignment

**PUT**

```
/assignments/:id
```

**Body**

```json
{
  "title": "Updated Project",
  "description": "Updated desc",
  "deadline": "2026-03-10"
}
```

---

### ➤ Delete assignment

**DELETE**

```
/assignments/:id
```

---

## 📤 SUBMISSIONS

### ➤ Submit assignment

**POST**

```
/submissions
```

**Body**

```json
{
  "assignment_id": 1,
  "user_id": 2,
  "github_url": "https://github.com/user/repo"
}
```

---

### ➤ Get all submissions

**GET**

```
/submissions
```

---

### ➤ Get submission by ID

**GET**

```
/submissions/:id
```

---

### ➤ Update submission

**PUT**

```
/submissions/:id
```

**Body**

```json
{
  "github_url": "https://github.com/user/new-repo"
}
```

---

### ➤ Delete submission

**DELETE**

```
/submissions/:id
```

---

## 🕒 ATTENDANCE

### ➤ Get all attendance

**GET**

```
/attendance
```

---

### ➤ Get attendance by user

**GET**

```
/attendance/user/:user_id
```

---

### ➤ Check-in

**POST**

```
/attendance/check-in
```

**Body**

```json
{
  "user_id": 1,
  "date": "2026-02-07",
  "check_in": "08:00"
}
```

---

### ➤ Check-out

**POST**

```
/attendance/check-out
```

**Body**

```json
{
  "user_id": 1,
  "date": "2026-02-07",
  "check_out": "17:00"
}
```

---

### ➤ Update attendance status

**PUT**

```
/attendance/status/:id
```

**Body**

```json
{
  "status": "izin"
}
```

---

### ➤ Delete attendance

**DELETE**

```
/attendance/:id
```

---

## 🛠 INIT DATABASE (DEV ONLY ⚠️)

### ➤ Initialize database

**POST**

```
/init
```
---