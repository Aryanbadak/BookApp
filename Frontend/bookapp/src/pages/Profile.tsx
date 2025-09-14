import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal } from "antd";
import api from "../api/axios";

interface Country {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
}

interface City {
  id: number;
  name: string;
  state_id: number;
}

interface ProfileFormValues {
  full_name: string;
  email: string;
  country_id: number;
  state_id: number;
  city_id: number;
  address: string;
}

export default function Profile() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"country" | "state" | "city" | null>(null);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    api.get("/locations/countries").then((r) => setCountries(r.data));
  }, []);

  const onCountryChange = (val: number) => {
    api.get(`/locations/states/${val}`).then((r) => setStates(r.data));
    setCities([]);
  };

  const onStateChange = (val: number) => {
    api.get(`/locations/cities/${val}`).then((r) => setCities(r.data));
  };

  const onFinish = (values: ProfileFormValues) => {
    api.post("/profile", values).then(() => alert("Profile saved!"));
  };

  
  const handleAddNew = (type: "country" | "state" | "city") => {
    setModalType(type);
    setIsModalOpen(true);
    setNewValue("");
  };

  // save new location manually
  const handleSaveNew = () => {
    if (!newValue.trim() || !modalType) return;

    if (modalType === "country") {
      const newItem: Country = { id: Date.now(), name: newValue };
      setCountries((prev) => [...prev, newItem]);
    }
    if (modalType === "state") {
      const newItem: State = { id: Date.now(), name: newValue, country_id: 0 }; 
      setStates((prev) => [...prev, newItem]);
    }
    if (modalType === "city") {
      const newItem: City = { id: Date.now(), name: newValue, state_id: 0 }; 
      setCities((prev) => [...prev, newItem]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="card max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <Form<ProfileFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item label="Full name" name="full_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item label="Country" name="country_id" rules={[{ required: true }]}>
            <Select
              onChange={onCountryChange}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Button type="link" onClick={() => handleAddNew("country")}>
                    ➕ Add new country
                  </Button>
                </>
              )}
              options={countries.map((c) => ({ label: c.name, value: c.id }))}
            />
          </Form.Item>

          <Form.Item label="State" name="state_id" rules={[{ required: true }]}>
            <Select
              onChange={onStateChange}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Button type="link" onClick={() => handleAddNew("state")}>
                    ➕ Add new state
                  </Button>
                </>
              )}
              options={states.map((s) => ({ label: s.name, value: s.id }))}
            />
          </Form.Item>

          <Form.Item label="City" name="city_id" rules={[{ required: true }]}>
            <Select
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Button type="link" onClick={() => handleAddNew("city")}>
                    ➕ Add new city
                  </Button>
                </>
              )}
              options={cities.map((c) => ({ label: c.name, value: c.id }))}
            />
          </Form.Item>
        </div>

        <Form.Item label="Address" name="address">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>

      <Modal
        open={isModalOpen}
        title={`Add new ${modalType}`}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSaveNew}
      >
        <Input
          placeholder={`Enter ${modalType} name`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Modal>
    </div>
  );
}