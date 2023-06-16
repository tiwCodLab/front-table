import { useEffect, useState } from "react";
import { Form, redirect, useNavigate, useParams } from "react-router-dom";

export async function editAction({ request, params }) {
  try {
    const formData = await request.formData();
    const tableData = Object.fromEntries(formData);

    const updatedData = { ...tableData };
    console.log(params.table_id);

    const response = await fetch(`/table/${params.table_id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw Error(`Could not update table ${params.table_id}`);
    }

    // ดำเนินการอื่น ๆ ที่คุณต้องการเมื่ออัปเดตสำเร็จ

    return redirect("/admin"); // เปลี่ยนเส้นทางไปยังหน้า /admin
  } catch (error) {
    console.error("Error:", error);
    // ดำเนินการอื่น ๆ ที่คุณต้องการเมื่อเกิดข้อผิดพลาดในการอัปเดต
  }
}

export default function UpdateTable() {
  const { table_id } = useParams();
  const navigate = useNavigate();

  // Load initial product data from API
  const [table, setTable] = useState();
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/table/${table_id}`);
      const data = await response.json();
      setTable(data);
    }
    fetchProduct();
  }, [table_id]);

  // Render loading state while waiting for product data to load
  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <Form replace method="post" className="product-form">
      <label>
        <span>Zone</span>
        <input
          //   placeholder="Name"
          type="text"
          name="zone"
          required
          defaultValue={table.zone}
        />
      </label>

      <p>
        <button type="submit" className="bt-save">
          Save
        </button>
        <button
          className="bt-cancel"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
