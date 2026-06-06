# 📋 EXAM2024 - Tasks List Application

> **Ứng dụng Quản Lý Danh Sách Công Việc (Task List)**  
> Sử dụng: HTML, CSS, Bootstrap, JavaScript, ReactJS

---

## 👤 Thông Tin Sinh Viên

| Thông Tin | Chi Tiết |
|-----------|---------|
| **Tên Sinh Viên** | Trịnh Bùi Duy Nguyên |
| **MSSV** | 2251061853 |
| **Lớp** | 66KTPM2 |
| **Email** | nguyentwd.hubt@gmail.com |
| **GitHub Repo** | [CSE391_Ktra_2251061853_TrinhBuiDuyNguyen_66KTPM2](https://github.com/nguyentkd/CSE391_Ktra_2251061853_TrinhBuiDuyNguyen_66KTPM2) |

---

## 📝 Mô Tả Dự Án

Ứng dụng web cho phép người dùng:
- ✅ **Xem** danh sách công việc
- ✅ **Thêm** công việc mới với mức độ ưu tiên
- ✅ **Sửa** công việc hiện có
- ✅ **Xóa** công việc
- ✅ **Chuyển đổi** trạng thái công việc (To Do → In Progress → Done)
- ✅ **Lưu trữ** dữ liệu tự động trên trình duyệt (localStorage)

---

## 🎯 Yêu Cầu Đề Bài

### ✅ Câu 1: Giao Diện (4 điểm)
**HTML, CSS, Bootstrap - Xây dựng giao diện theo hình minh họa**

- ✅ Grid layout 2 cột: TaskList (trái) + TaskForm (phải)
- ✅ Sử dụng Bootstrap design principles (color system, shadows, transitions)
- ✅ Responsive design: Mobile-friendly
- ✅ Header với button "Add Task"
- ✅ Priority colors: Red (High), Orange (Medium), Green (Low)
- ✅ Status badges: To Do, In Progress, Done
- ✅ Action buttons: ↻ (toggle status), ✎ (edit), 🗑 (delete)

**Files:**
- `src/components/TaskApp.css`
- `src/components/TaskList.css`
- `src/components/TaskItem.css`
- `src/components/TaskForm.css`

---

### ✅ Câu 2: JavaScript - Kiểm Tra Dữ Liệu (3 điểm)
**Validation Form & JSON Data**

- ✅ File `public/data.json` chứa ≥5 tasks mẫu
- ✅ Validate title: **3-100 ký tự** (>100 bị từ chối)
- ✅ Validate priority: High, Medium, Low
- ✅ Real-time character count display (X/100)
- ✅ Error message chi tiết khi input không hợp lệ
- ✅ Hàm validate functions trong `src/utils/validateTask.js`

**Files:**
- `public/data.json` - 5 tasks mẫu
- `src/utils/validateTask.js` - Hàm validation
- `src/components/TaskForm.js` - Form với validation

**Validation Rules:**
| Input | Kết Quả |
|-------|---------|
| Trống | ❌ Error |
| <3 ký tự | ❌ Error |
| 3-100 ký tự | ✅ Valid |
| >100 ký tự | ❌ Error |

---

### ✅ Câu 3: ReactJS - Logic & State (3 điểm)
**Props Drilling & Event Handlers**

- ✅ **Props Drilling**: Truyền data từ cha (TaskApp) → con (TaskList → TaskItem)
- ✅ **State Management**: `tasks`, `editingTask`, `error`
- ✅ **Event Handlers**: Add, Update, Delete, Toggle Status
- ✅ **useEffect Hooks**: 
  - Load data từ localStorage/JSON
  - Auto-save data mỗi khi thay đổi
  - Fill form khi edit
- ✅ **localStorage Persistence**: Dữ liệu lưu trên trình duyệt
- ✅ **Edit Mode**: Form tự động switch giữa "Add Task" / "Chỉnh sửa Task"

**Files:**
- `src/components/TaskApp.js` - Component cha, state management
- `src/components/TaskList.js` - Props drilling đến TaskItem
- `src/components/TaskItem.js` - Event handlers
- `src/components/TaskForm.js` - Form Add/Edit

**Props Flow:**
```
TaskApp (State)
├─ TaskList (receive: tasks, callbacks)
│  └─ TaskItem (receive: task, callbacks)
│     ├─ onToggleStatus(id)
│     ├─ onEdit(task)
│     └─ onDelete(id)
└─ TaskForm (receive: callbacks, editingTask)
   ├─ onAdd(title, priority)
   ├─ onUpdate(updatedTask)
   └─ onCancelEdit()
```

---

## 📁 Cấu Trúc Project

```
EXAM2024.Minhhoa/
├── public/
│   ├── data.json              # 5 tasks mẫu
│   ├── index.html             # HTML chính
│   ├── manifest.json
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TaskApp.js         # Component cha + state
│   │   ├── TaskApp.css
│   │   ├── TaskForm.js        # Form Add/Edit + validation
│   │   ├── TaskForm.css
│   │   ├── TaskList.js        # Danh sách tasks
│   │   ├── TaskList.css
│   │   ├── TaskItem.js        # 1 task item
│   │   ├── TaskItem.css
│   │   └── index.css
│   ├── utils/
│   │   └── validateTask.js    # Hàm validate
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── reportWebVitals.js
├── package.json
├── README.md                  # File này
└── .gitignore
```

---

## 🚀 Cách Chạy

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Chạy development server**
```bash
npm start
```
Truy cập: [http://localhost:3000](http://localhost:3000)

### 3. **Build for production**
```bash
npm run build
```

---

## 📊 Commit History

### Câu 1: Giao Diện
```bash
git commit -m "Câu 1: Xây dựng giao diện Tasks List với HTML, CSS, Bootstrap"
```
- ✅ TaskApp, TaskList, TaskItem, TaskForm components
- ✅ CSS styling cho tất cả components

### Câu 2: Validation
```bash
git commit -m "Câu 2: Kiểm tra dữ liệu JSON, xử lý validation form (>100 ký tự tối thiểu)"
```
- ✅ data.json với 5 tasks
- ✅ Hàm validateTask.js
- ✅ TaskForm validation logic

### Câu 3: ReactJS
```bash
git commit -m "Câu 3: Triển khai logic ReactJS (state, props drilling, event handlers)"
```
- ✅ State management & useEffect
- ✅ Event handlers: Add, Update, Delete, Toggle
- ✅ localStorage persistence

---

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|----------|---------|
| **React** | 18.x | Frontend framework |
| **JavaScript (ES6+)** | - | Validation logic |
| **CSS3** | - | Styling & responsive |
| **HTML5** | - | Structure |
| **localStorage** | - | Data persistence |

---

## 📌 Các Tính Năng Chính

### 1. **Add Task** 
- Nhập tên task (3-100 ký tự)
- Chọn priority (High/Medium/Low)
- Tự động lưu vào localStorage

### 2. **Edit Task** 
- Bấm button ✎ trên task
- Form tự động fill dữ liệu
- Button đổi thành "Lưu"

### 3. **Delete Task**
- Bấm button 🗑 để xóa
- Xóa luôn khỏi localStorage

### 4. **Toggle Status**
- Bấm button ↻ để chuyển trạng thái
- Cycle: To Do → In Progress → Done → To Do

### 5. **Data Persistence**
- Dữ liệu tự động lưu khi thay đổi
- Load lại trang vẫn giữ dữ liệu
- Fallback: Load từ data.json nếu localStorage trống

---

## ✨ Điểm Nổi Bật

✅ **Clean Code**: Components nhỏ, tái sử dụng được  
✅ **Best Practices**: Props drilling, state lifting, immutability  
✅ **Responsive Design**: Hoạt động tốt trên desktop & mobile  
✅ **Error Handling**: Validate input, hiển thị error message  
✅ **Data Persistence**: localStorage auto-save  
✅ **Good Git History**: 3 commits rõ ràng theo yêu cầu  

---

## 📞 Liên Hệ

- **Email**: nguyentwd.hubt@gmail.com
- **GitHub**: [github.com/nguyentkd](https://github.com/nguyentkd)

---

## 📄 Giấy Phép

Dự án này là bài tập học tập cho khoá học CSE391 - Bootstrap Track.

---

**Hoàn thành:** 06-06-2026  
**Trạng thái:** ✅ Ready for submission

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
