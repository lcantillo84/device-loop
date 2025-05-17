export default function Contact() {
    return (
        <div className="min-h-screen bg-base-100 p-8">
            <div className="max-w-xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
                <form className="card bg-base-200 shadow-xl p-6 space-y-4">
                    <div className="form-control">
                        <label className="label">Name</label>
                        <input type="text" placeholder="Your name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input type="email" placeholder="you@example.com" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">Message</label>
                        <textarea className="textarea textarea-bordered" rows={5} placeholder="Tell us how we can help..." />
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-500">Or email us directly at <a href="mailto:hello@deviceloop.org" className="link">hello@deviceloop.org</a></p>
            </div>
        </div>
    )
}
