## Demo Registry Pattern

Dự án minh hoạ một biến thể của **Registry Pattern**/Service Locator trong NestJS. `RegistryService` đóng vai trò trung tâm, tự động đăng ký các service con (`S1` → `S10`) bằng `key` duy nhất và thực thi theo chuỗi phụ thuộc.

---

- **Stack**: Node.js 18+, NestJS 10, TypeScript 5
- **Mục tiêu**: cách tổ chức, đăng ký và kích hoạt handler động thông qua HTTP endpoint duy nhất

---

## Kiến trúc nhanh

```
REST Client ──► RegistryController (/registry/execute?key=s1)
                     │
                     ▼
             RegistryService (central hub)
                 ├─► S1Service
                 ├─► S2Service
                 └─► ...
```

- Mọi service implement `IService` (`key` + `execute`).
- `RegistryService` giữ `handlers` dạng `Record<string, IService>` để chia sẻ lẫn nhau.
- Các service có thể gọi nhau để tạo thành cây tính toán (composite).

### Phân loại handler

| Loại          | Service                 | Ghi chú                                 |
| ------------- | ----------------------- | --------------------------------------- |
| Leaf          | `s3`, `s4`, `s6`        | Trả về hằng số (10/20/30)               |
| Composite nhỏ | `s2`, `s5`, `s7`        | Ghép kết quả 2 leaf/handler             |
| Composite lớn | `s1`, `s8`, `s9`, `s10` | Tính toán sâu hơn, có khả năng tạo vòng |

---

## Cài đặt & chạy

```bash
npm install
npm run start:dev
# Server listening tại http://localhost:3000
```

Các script hữu ích khác:

- `npm run build`: build production (`dist/`)
- `npm run start:prod`: chạy bản build
- `npm run lint` / `npm run format`: đảm bảo coding style
- `npm test`: placeholder Jest, chưa có test mẫu

---

## API mẫu

- **Endpoint**: `GET /registry/execute`
- **Query**:
  - `key`: `s1` → `s10`
  - `params`: tuỳ chọn, hiện chưa dùng trong các leaf

Ví dụ:

```bash
curl "http://localhost:3000/registry/execute?key=s8"
```

Khi `key=s8`, flow mặc định:

```
s8 → (s9 + s10)
   → s9 → (s5 + s7) → ...
   → s10 → (s6 + s9) → ...
```

Kết quả cuối cùng là tổng các leaf (`s3=10`, `s4=20`, `s6=30`).

---

## Mở rộng / lưu ý thiết kế

- **Thêm service mới**: tạo file trong `src/modules/services`, implement `IService`, khai báo vào `RegistryModule` và constructor `RegistryService`.
- **Quản lý key**: cân nhắc dùng `enum` hoặc `const` để tránh typo.
- **Tránh vòng lặp**: hiện chưa có cycle detection; nếu thêm service mới có thể gây recursion vô hạn.
- **Caching**: nếu nhiều service gọi cùng leaf, nên thêm memoization per-request.
- **Testing**: có thể mock `RegistryService.execute` hoặc viết unit test cho từng handler bằng cách truyền `handlers` giả lập.

---

## Thư mục chính

| Đường dẫn                            | Nội dung                       |
| ------------------------------------ | ------------------------------ |
| `src/main.ts`                        | Bootstrap Nest app             |
| `src/app.module.ts`                  | Khai báo `RegistryModule`      |
| `src/modules/registry.controller.ts` | HTTP entry cho registry        |
| `src/modules/services/*.ts`          | Bộ handler `S1` → `S10`        |
| `DESIGN_ANALYSIS.md`                 | Phân tích kiến trúc, trade-off |
| `DEPENDENCY_GRAPH.md`                | Sơ đồ phụ thuộc chi tiết       |

---

## Lộ trình phát triển gợi ý

1. Tự động đăng ký handler qua metadata hoặc `ModuleRef`.
2. Bổ sung lớp `ExecutionContext` để theo dõi trace, detect cycle.
3. Viết unit test/Jest snapshot cho từng handler và e2e test cho `/registry/execute`.
4. Tách cấu hình key/hard-coded value sang file riêng để dễ bảo trì.

---

Chúc bạn khám phá vui vẻ!
