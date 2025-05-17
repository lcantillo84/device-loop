export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto p-10 text-gray-800">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Get in Touch</h2>
            <p className="mb-6">Have questions or want to partner with us? Reach out below — we’d love to hear from you.</p>

            <form className="space-y-4">
                <input type="text" placeholder="Name" className="input input-bordered w-full" />
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
                <textarea placeholder="Your message..." className="textarea textarea-bordered w-full"></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        </div>
    )
}