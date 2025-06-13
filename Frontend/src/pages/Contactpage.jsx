import React, { useState } from 'react';

const ContactPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Contact Us</h2>
            {submitted ? (
                <div style={{ color: 'green' }}>Thank you for contacting us!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Name:<br />
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8 }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Email:<br />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8 }}
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label>
                            Message:<br />
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                style={{ width: '100%', padding: 8 }}
                            />
                        </label>
                    </div>
                    <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
                </form>
            )}
        </div>
    );
};

export default ContactPage;