import { useEffect } from 'react'
import { Form, Input, Button, Upload, InputNumber } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/axios'

interface BookFormProps {
    edit?: boolean;
}

export default function BookForm({ edit }: BookFormProps) {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (id) api.get(`/books/${id}`).then((r) => form.setFieldsValue(r.data));
    }, [form, id]);

    interface BookFormValues {
        title: string;
        author: string;
        year?: number;
        genre?: string;
        cover?: {
            file: File;
        };
    }

    const onFinish = async (values: BookFormValues) => {
        const fd = new FormData();
        fd.append("title", values.title);
        fd.append("author", values.author);
        if (values.year) fd.append("year", String(values.year));
        if (values.genre) fd.append("genre", values.genre);
        if (values.cover?.file) fd.append("cover", values.cover.file);
        if (!id) {
            await api.post("/books", { "title": values.title, "author": values.author, "year": values.year, "genre": values.genre });
        } else {
            await api.put(`/books/${id}`, { "title": values.title, "author": values.author, "year": values.year, "genre": values.genre });
        }
        navigate("/books");
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
                {id ? "Edit" : "Add"} Book {edit && "(edit mode)"}
            </h2>
            <Form<BookFormValues> form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item name='title' label='Title' rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name='author' label='Author' rules={[{ required: true }]}><Input /></Form.Item>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Form.Item name='year' label='Year'><InputNumber style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name='genre' label='Genre'><Input /></Form.Item>
                </div>
                <Form.Item
                    name="cover"
                    label="Cover"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                >
                    <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
                        <Button icon={<UploadOutlined />}>Upload cover</Button>
                    </Upload>
                </Form.Item>
                <div className='flex gap-2'>
                    <Button type='primary' htmlType='submit'>Save</Button>
                    <Button onClick={() => navigate('/books')}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
}